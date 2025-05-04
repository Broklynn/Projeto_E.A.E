#include <WiFiEspAT.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal.h>
#include <math.h>

#define EspSerial Serial1 /
char ssid[] = "SUA_REDE_WIFI";
char pass[] = "SENHA_WIFI";

WiFiClient client;

const char* host = "http://192.168.1.10";  
const int port = 3000;

#define NTC_PIN A0
#define SENSOR_PIN A1

#define SERIES_RESISTOR 10000
#define NOMINAL_RESISTANCE 10000
#define NOMINAL_TEMPERATURE 25
#define B_COEFFICIENT 3950

void setup() {
  Serial.begin(9600);         
  EspSerial.begin(9600);   
  WiFi.init(&EspSerial);

  Serial.println("Conectando ao Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(ssid, pass);
    delay(5000);
  }
  Serial.println("Wi-Fi conectado!");
}

void loop() {
  int sensorValue = analogRead(SENSOR_PIN);
  int adcValue = analogRead(NTC_PIN);

  float resistance = SERIES_RESISTOR / (1023.0 / adcValue - 1.0);
  float steinhart = resistance / NOMINAL_RESISTANCE;
  steinhart = log(steinhart);
  steinhart /= B_COEFFICIENT;
  steinhart += 1.0 / (NOMINAL_TEMPERATURE + 273.15);
  steinhart = 1.0 / steinhart;
  float temperatureC = steinhart - 273.15;

  Serial.print("Enviando: Temp=");
  Serial.print(temperatureC);
  Serial.print(" | Umidade=");
  Serial.println(sensorValue);

  if (WiFi.status() == WL_CONNECTED) {
    if (client.connect(host, port)) {
      String json = "{\"temperatura_agua\":" + String(temperatureC, 2) +
                    ",\"umidade_solo\":" + String(sensorValue) +
                    ",\"umidade_ar\":0}";

      client.println("POST /api/sensores HTTP/192.168.01");
      client.println("Host: " + String(host));
      client.println("Content-Type: application/json");
      client.print("Content-Length: ");
      client.println(json.length());
      client.println();
      client.println(json);

      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") break;
      }

      String response = client.readString();
      Serial.println("Resposta do servidor:");
      Serial.println(response);
      client.stop();
    }
  }

  delay(10000);
}
