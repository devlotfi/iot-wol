#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <WiFiUdp.h>
#include <PubSubClient.h>
#include <pgmspace.h>
#include <ArduinoJson.h>
#include <ESP32Ping.h>

// ----------------------
// Wi-Fi credentials
// ----------------------
const char* ssid = "SSID";
const char* password = "PASSWORD";

// ----------------------
// MQTT credentials
// ----------------------
const char* mqtt_server   = "MQTT_SERVER";
const int   mqtt_port     = 8883;
const char* mqtt_user     = "USER";
const char* mqtt_password = "PASSWORD";

// ----------------------
// MQTT Topics
// ----------------------
const char* mqtt_cmd_topic      = "iot-wol/topic";           // incoming commands
const char* mqtt_response_topic = "iot-wol/response-topic";  // outgoing responses

// ----------------------
// UDP for WOL
// ----------------------
WiFiUDP udp;
const int WOL_PORT = 9;

// ----------------------
// TLS Root Certificate
// ----------------------
const char rootCA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
Put your certificate here
-----END CERTIFICATE-----
)EOF";

WiFiClientSecure espClient;
PubSubClient client(espClient);

unsigned long lastPublish = 0;
const unsigned long publishInterval = 3600000;

// ============================================================================
// Send JSON response to response topic
// ============================================================================
void sendJSON(const JsonDocument& doc) {
  char buffer[256];
  size_t len = serializeJson(doc, buffer);

  if (client.publish(mqtt_response_topic, buffer, len)) {
    Serial.printf("JSON Sent → %s\n", buffer);
  } else {
    Serial.println("Failed to send JSON");
  }
}

// ============================================================================
// Parse MAC string → array
// ============================================================================
bool parseMac(const char* macStr, uint8_t* macOut) {
  int values[6];
  if (sscanf(macStr, "%x:%x:%x:%x:%x:%x",
      &values[0], &values[1], &values[2],
      &values[3], &values[4], &values[5]) != 6) {
    return false;
  }
  for (int i = 0; i < 6; i++) macOut[i] = (uint8_t)values[i];
  return true;
}

// ============================================================================
// Send WOL Magic Packet
// ============================================================================
bool sendWOL(uint8_t* mac) {
  uint8_t packet[102];

  memset(packet, 0xFF, 6);
  for (int i = 6; i < 102; i += 6)
    memcpy(&packet[i], mac, 6);

  IPAddress broadcastIP = ~WiFi.subnetMask() | WiFi.gatewayIP();

  Serial.print("Broadcast IP: ");
  Serial.println(broadcastIP);

  if (udp.beginPacket(broadcastIP, WOL_PORT) == 0) return false;
  if (udp.write(packet, sizeof(packet)) != sizeof(packet)) return false;
  if (!udp.endPacket()) return false;

  return true;
}

// ============================================================================
// MQTT callback: Process incoming JSON command
// ============================================================================
void callback(char* topic, byte* payload, unsigned int length) {
  String jsonStr;
  for (unsigned int i = 0; i < length; i++)
    jsonStr += (char)payload[i];

  Serial.print("MQTT JSON Received: ");
  Serial.println(jsonStr);

  StaticJsonDocument<256> doc;
  DeserializationError err = deserializeJson(doc, jsonStr);

  if (err) {
    Serial.println("JSON parse error");
    return;
  }

  const char* command = doc["command"];
  JsonObject params   = doc["params"];

  if (!command) {
    Serial.println("No command field");
    return;
  }

  // COMMAND: WAKE
  if (strcmp(command, "WAKE") == 0) {
    const char* macStr = params["mac"];
    StaticJsonDocument<128> resp;

    if (!macStr) {
      resp["event"] = "WOL_FAILED";
      resp["error"] = "Missing MAC";
      sendJSON(resp);
      return;
    }

    uint8_t mac[6];
    if (!parseMac(macStr, mac)) {
      resp["event"] = "WOL_FAILED";
      resp["error"] = "Invalid MAC format";
      sendJSON(resp);
      return;
    }

    bool ok = sendWOL(mac);

    if (ok) {
      resp["event"] = "WOL_SENT";
      resp["mac"]   = macStr;
    } else {
      resp["event"] = "WOL_FAILED";
      resp["mac"]   = macStr;
    }

    sendJSON(resp);
  }

  // COMMAND: PING
  else if (strcmp(command, "PING") == 0) {
    const char* ipStr = params["ip"];
    StaticJsonDocument<128> resp;

    if (!ipStr) {
      resp["event"] = "PING_RESULT";
      resp["alive"] = false;
      resp["error"] = "Missing IP";
      sendJSON(resp);
      return;
    }

    IPAddress targetIP;
    if (!targetIP.fromString(ipStr)) {
      resp["event"] = "PING_RESULT";
      resp["alive"] = false;
      resp["error"] = "Invalid IP Format";
      sendJSON(resp);
      return;
    }

    bool alive = Ping.ping(targetIP, 3);

    resp["event"] = "PING_RESULT";
    resp["ip"]    = ipStr;
    resp["alive"] = alive;

    sendJSON(resp);
  }

  // Unknown command
  else {
    StaticJsonDocument<128> resp;
    resp["event"] = "UNKNOWN_COMMAND";
    resp["command"] = command;
    sendJSON(resp);
  }
}

// ============================================================================
// Wi-Fi Setup
// ============================================================================
void setup_wifi() {
  Serial.println();
  Serial.printf("Connecting to WiFi: %s\n", ssid);

  WiFi.mode(WIFI_STA);
  WiFi.setSleep(false);
  WiFi.setAutoReconnect(true);
  WiFi.persistent(true);

  WiFi.begin(ssid, password);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    Serial.print(".");
    delay(500);
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\nWiFi Failed");
    ESP.restart();
  }

  Serial.println("\nWiFi connected!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// ============================================================================
// MQTT Reconnect
// ============================================================================
void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println(" connected!");
      client.subscribe(mqtt_cmd_topic);
    } else {
      Serial.print(" failed, rc=");
      Serial.println(client.state());
      delay(3000);
    }
  }
}

// ============================================================================
// Setup
// ============================================================================
void setup() {
  Serial.begin(115200);
  setup_wifi();

  espClient.setCACert(rootCA);
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  udp.begin(WOL_PORT);
}

void printWiFiStatus() {
  int rssi = WiFi.RSSI();
  Serial.printf("RSSI: %d dBm", rssi);
}

// ============================================================================
// Loop
// ============================================================================
void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi disconnected! Reconnecting...");
    setup_wifi();
  }

  if (!client.connected()) reconnect();
  client.loop();

  unsigned long now = millis();
  if (now - lastPublish > publishInterval) {
    lastPublish = now;

    StaticJsonDocument<128> hb;
    hb["event"] = "ESP32_ALIVE";
    hb["rssi"] = WiFi.RSSI();
    sendJSON(hb);
  }
}
