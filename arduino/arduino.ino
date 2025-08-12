#include <UIPEthernet.h>
#include <PubSubClient.h>

// ----------------- NETWORK SETTINGS -----------------
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 230);            // Static IP
IPAddress mqttServer(5, 196, 78, 28);      // MQTT broker IP
IPAddress broadcastIp(192, 168, 1, 255);   // Network broadcast IP

// ----------------- HARDWARE PINS -----------------
const int greenLedPin = 4;
const int redLedPin   = 5;
const int buzzerPin   = 6;

// ----------------- MQTT SETTINGS -----------------
const int mqttPort = 1883;
const char* mqttTopic = "lotfi/wol";
const char* ackTopic  = "lotfi/wol/ack";
const char* wakePassword = "wake"; // Command prefix

EthernetClient ethClient;
EthernetUDP udp;
PubSubClient client(ethClient);

// ----------------- WOL FUNCTION -----------------
void sendWOL(byte *macAddress) {
  byte magicPacket[102];

  // First 6 bytes are 0xFF
  for (int i = 0; i < 6; i++) magicPacket[i] = 0xFF;

  // Repeat target MAC 16 times
  for (int i = 0; i < 16; i++) {
    for (int j = 0; j < 6; j++) {
      magicPacket[6 + i * 6 + j] = macAddress[j];
    }
  }

  udp.beginPacket(broadcastIp, 9);
  udp.write(magicPacket, sizeof(magicPacket));
  udp.endPacket();
  Serial.println("WOL magic packet sent.");
}

// ----------------- MAC PARSING FUNCTION -----------------
bool parseMac(const char* str, byte* mac) {
  unsigned int values[6];
  if (sscanf(str, "%x:%x:%x:%x:%x:%x",
             &values[0], &values[1], &values[2],
             &values[3], &values[4], &values[5]) == 6) {
    for (int i = 0; i < 6; i++) {
      mac[i] = (byte) values[i];
    }
    return true;
  }
  return false;
}

// ----------------- MQTT CALLBACK -----------------
void callback(char* topic, byte* payload, unsigned int length) {
  payload[length] = '\0'; // Null-terminate
  char* message = (char*)payload;

  Serial.print("MQTT Message: ");
  Serial.println(message);

  // Check if message starts with wakePassword
  if (strncmp(message, wakePassword, strlen(wakePassword)) == 0) {
    byte targetMac[6];

    // Look for space after password to parse MAC
    if (length > strlen(wakePassword)) {
      char* macStr = message + strlen(wakePassword) + 1; // Skip space
      if (parseMac(macStr, targetMac)) {
        Serial.println("Parsed MAC from MQTT.");

        // Notify with buzzer
        for (int i = 0; i < 3; i++) {
          digitalWrite(buzzerPin, HIGH);
          delay(500);
          digitalWrite(buzzerPin, LOW);
          delay(500);
        }

        // Send WOL
        sendWOL(targetMac);

        // Acknowledge
        client.publish(ackTopic, "WOL_SENT");
      } else {
        Serial.println("Invalid MAC format. Ignoring command.");
      }
    } else {
      Serial.println("No MAC provided. Ignoring command.");
    }
  } else {
    client.publish(ackTopic, "INVALID_PASSWORD");
    Serial.println("Invalid wake password.");
  }
}

// ----------------- MQTT RECONNECT -----------------
void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect("arduinoNanoClientSecure")) {
      Serial.println("connected.");
      client.subscribe(mqttTopic);
      digitalWrite(greenLedPin, HIGH);
      digitalWrite(redLedPin, LOW);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds...");
      digitalWrite(greenLedPin, LOW);
      digitalWrite(redLedPin, HIGH);
      delay(5000);
    }
  }
}

// ----------------- SETUP -----------------
void setup() {
  Serial.begin(9600);

  pinMode(greenLedPin, OUTPUT);
  pinMode(redLedPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);

  Ethernet.begin(mac, ip);
  delay(2000); // ENC28J60 needs more startup time
  udp.begin(9);

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  Serial.print("Local IP: ");
  Serial.println(Ethernet.localIP());
}

// ----------------- LOOP -----------------
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
