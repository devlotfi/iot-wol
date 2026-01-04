#include <WiFi.h>
#include <WiFiUdp.h>
#include "thingProperties.h"

// Track initialization state
bool udpInitialized = false;
unsigned long lastConnectionAttempt = 0;
const unsigned long CONNECTION_TIMEOUT = 30000; // 30 seconds

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

bool sendWOL(uint8_t* mac) {
  // Ensure WiFi is connected
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected - cannot send WOL");
    return false;
  }

  // Ensure UDP is initialized
  if (!udpInitialized) {
    Serial.println("UDP not initialized - cannot send WOL");
    return false;
  }

  // Build magic packet: 6 bytes of 0xFF followed by 16 repetitions of target MAC
  uint8_t packet[102];
  memset(packet, 0xFF, 6);

  for (int i = 6; i < 102; i += 6) {
    memcpy(&packet[i], mac, 6);
  }

  // Calculate broadcast address
  IPAddress localIP = WiFi.localIP();
  IPAddress subnet  = WiFi.subnetMask();

  IPAddress broadcastIP;
  for (int i = 0; i < 4; i++) {
    broadcastIP[i] = localIP[i] | ~subnet[i];
  }

  Serial.print("Sending WOL to broadcast: ");
  Serial.println(broadcastIP);

  // Send packet
  if (!udp.beginPacket(broadcastIP, WOL_PORT)) {
    Serial.println("Failed to begin UDP packet");
    return false;
  }
  
  udp.write(packet, sizeof(packet));
  
  if (!udp.endPacket()) {
    Serial.println("Failed to send UDP packet");
    return false;
  }

  return true;
}

void handleToggle(const char* macStr) {
  Serial.printf("Toggle changed for MAC: %s\n", macStr);

  uint8_t mac[6];
  if (!parseMac(macStr, mac)) {
    Serial.println("Invalid MAC address format");
    return;
  }
  
  bool ok = sendWOL(mac);
  if (ok) {
    Serial.println("✓ WOL packet sent successfully");
  } else {
    Serial.println("✗ WOL send failed");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1500);

  Serial.println("\n=== Arduino IoT Cloud WOL Device ===");
  Serial.println("Initializing...");

  // Only force STA mode and disable sleep
  WiFi.mode(WIFI_STA);
  WiFi.setSleep(false);

  // Initialize Arduino Cloud properties
  initProperties();

  // Start Arduino Cloud connection
  ArduinoCloud.begin(ArduinoIoTPreferredConnection);
  
  // Debug info
  setDebugMessageLevel(2);
  ArduinoCloud.printDebugInfo();

  lastConnectionAttempt = millis();
}


void loop() {
  ArduinoCloud.update();

  if (WiFi.status() == WL_CONNECTED && ArduinoCloud.connected() && !udpInitialized) {
    Serial.println("WiFi + Cloud connected, initializing UDP...");
    udp.begin(WOL_PORT);
    udpInitialized = true;
    Serial.println("✓ UDP ready on port 9");
    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
  }

  // Optional: watchdog restart if stuck
  if (!ArduinoCloud.connected() && millis() - lastConnectionAttempt > CONNECTION_TIMEOUT) {
    Serial.println("Connection timeout - restarting ESP32");
    delay(1000);
    ESP.restart();
  }

  if (ArduinoCloud.connected()) lastConnectionAttempt = millis();
}

// -----------------------------------------------------------------
// Add a handler for each switch for each device with its mac adress
// -----------------------------------------------------------------

/*
  Since PowerPC is READ_WRITE variable, onPowerPCChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onPowerPCChange()  {
  handleToggle("AA:AA:AA:AA:AA:AA"); 
}
