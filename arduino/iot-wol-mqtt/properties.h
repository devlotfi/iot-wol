// ----------------------
// Wi-Fi credentials
// ----------------------
const char* ssid = "ssid";
const char* password = "password";

// ----------------------
// MQTT credentials
// ----------------------
const char* mqtt_server   = "mqtt_server";
const int   mqtt_port     = 8883;
const char* mqtt_user     = "mqtt_user";
const char* mqtt_password = "mqtt_password";

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
...
-----END CERTIFICATE-----
)EOF";

WiFiClientSecure espClient;
PubSubClient client(espClient);

unsigned long lastPublish = 0;
const unsigned long publishInterval = 3600000;
