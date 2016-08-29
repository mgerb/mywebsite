# Temperature Sensor on the Web

The temperature readings that are displayed on this site come from the ESP8266 with a DHT11 sensor attached to it. I am going to explain the steps in the entire process. I will split it up into two parts. In this post I will focus on programming the ESP8266 and how to send data to a web server.

* * *

Update: I have updated some information regarding this project. Refer to these other posts.

[ESP8266 temperature sensor updates and difficulties](/?post=12-29-15.html)  
[Temperatue Sensor - Server Side](/?post=1-1-2016.html)  

For this project you will need an ESP8266 and a DHT temperature sensor. For prototyping purposes I prefer to use the [NodeMCU module](http://www.banggood.com/NodeMcu-Lua-ESP-12E-WIFI-Development-Board-p-985891.html). There are a variety of temperature sensors that you could use, but I prefer the DHT11 because it is easy to use and it is cheap! I ordered a 5 pack of them from [Banggood](http://www.banggood.com/5Pcs-KY-015-DHT11-Temperature-Humidity-Sensor-Module-For-Arduino-p-983263.html). The source code for this project can be found on [Github](https://github.com/mgerb/esp8266-HTTPTempSensor).

## How it works

When the ESP first boots up, it reads WiFi credentials from the EEPROM and tries to connect to an access point using those credentials. If no connection is made, it starts up it's own access point and runs a web server with a captive portal. This means that when anyone connects to it, it will redirect any dns request to itself, which forces anyone to the configuration page. The user can connect to the access point and enter in the ssid, password, and preferred sensor name. This information will be saved into EEPROM and the ESP will then reboot and start sending sensor data to the server.

![image](http://i.imgur.com/PhnDEyU.png)

## ESP8266 File System

To run the web server, I used the file system library within the arduino ESP library. This is how I store the web content in flash on the chip. It allows me to modify all of the necessary web files without having to deal with sending them as strings from the arduino code.

To use the file system, you must download the tool [here](https://github.com/esp8266/arduino-esp8266fs-plugin/releases/download/0.1.3/ESP8266FS-0.1.3.zip) to upload your files to the ESP. Once downloaded, store it in a tools folder in the arduino folder (path "/Arduino/tools/ESP8266FS/tool/esp8266fs.jar"). Now when you create a new sketch go to the sketch folder and create a "data" folder. To upload data to this folder select "Tools > ESP8266 Sketch Data Upload" and the files will be uploaded to the ESP and will be ready to use within the program. More information on the ESP8266 file system can be found [here](http://esp8266.github.io/Arduino/versions/2.0.0/doc/filesystem.html).

## Sending data to the server

There are many ways to send the data to a server, but I implemented data transfer with a simple get request. I chose this route because it is extremely simple to create a REST API in Node.js. I will cover this in a nother post. If you are unfamiliar with a get request, it is a way a web server can receive a request, and also parameters within that request. In this case, I send temperature, humidity, location, and a key as parameters in the request.

If this were a full production application, this would not be the ideal way to handle data transfer to a server because it is not encrypted. A better practice would be to implement this using another TCP transfer protocol. In my case, it would be better to send a POST request over SSL, but I have not looked into that for this project yet as the method I am currently using seems to work just fine.

## Code

```arduino
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <ESP8266mDNS.h>
#include <EEPROM.h>
#include <FS.h>
#include <DHT.h>

DHT dht(5, DHT11);

char ssid[32] = "";
char password[32] = "";
char sensorName[32] = "";

//key used by web server to prevent unnecessary http requests
const String server_password = "";

const int httpPort = 80;
const char* host = "162.243.16.83";

boolean connected;

// DNS server
const byte DNS_PORT = 53;

// Web server
ESP8266WebServer server(80);
DNSServer dnsServer;
WiFiClient client;

/* Soft AP network parameters */
IPAddress apIP(192, 168, 1, 1);
IPAddress netMsk(255, 255, 255, 0);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  
  delay(1000);
  
  loadCredentials();
  
  //try to connect to access point
  WiFi.disconnect();
  WiFi.begin(ssid,password);
  
  int connRes = WiFi.waitForConnectResult();
  Serial.print ( "connRes: " );
  Serial.println ( connRes );
  
  Serial.println("Connecting");

  for (int i = 0; WiFi.status() != WL_CONNECTED && i <10; i++){
    Serial.print(".");
    delay(1000);
  }
  
  //if connected skip setting up access point
  if(WiFi.status() != WL_CONNECTED){
    connected = false;
    
    WiFi.mode(WIFI_AP);
    WiFi.softAPConfig(apIP, apIP, netMsk);
    WiFi.softAP("Sensor Config");
   
    delay(500);
    
    server.on("/", handleRoot);
    server.on("/config", handleConfig);
    server.on("/bootstrap.min.css", handleBootstrap);
    server.on("/style.css", handleCss);
    server.onNotFound(handleNotFound);

    SPIFFS.begin();
    dnsServer.start(DNS_PORT, "*", apIP);
    server.begin();
  }
  else{
    connected = true;
    WiFi.mode(WIFI_STA);
    dht.begin();
  }
  
}

void loop() {
  //if could not connect to access point
  if (!connected){
    dnsServer.processNextRequest();
    server.handleClient();
  }
  else{
    if (!client.connect(host, httpPort)) {
      return;
    }
  
    float temp = dht.readTemperature(true);
    float humidity = dht.readHumidity();

    // We now create a URI for the request
    String url = "/temperature";
    url += "?temperature=";
    url += temp;
    url += "&humidity=";
    url += humidity;
    url += "&key=";
    url += server_password;
    url += "&location=";
    url += sensorName;

    url.replace(" ", "+");
    
    Serial.println("URL: " + url);
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
    delay(100);
    
    while(client.available()){
      String line = client.readStringUntil('\r');
      Serial.print("Response: " + line);
    }
    
    //delay(10000);
    ESP.deepSleep(120 * 1000000, WAKE_RF_DEFAULT);
  }
}

void handleRoot(){
    if(SPIFFS.exists("/index.html")){

      File file = SPIFFS.open("/index.html", "r");

      server.streamFile(file, "text/html");

      file.close();
    }
    else{
      server.send(404, "file doesn't exist");
    } 
}

void handleBootstrap(){
    if(SPIFFS.exists("/bootstrap.min.css")){

      File file = SPIFFS.open("/bootstrap.min.css", "r");

      server.streamFile(file, "text/css");

      file.close();
    }
    else{
      server.send(404, "file doesn't exist");
    }
}

void handleConfig(){
  
  if (server.arg("password") != "" && server.arg("ssid") != "" && server.arg("name") != ""){
   
    
    server.arg("ssid").toCharArray(ssid, sizeof(ssid) -1);
    server.arg("password").toCharArray(password, sizeof(password) -1);
    server.arg("name").toCharArray(sensorName, sizeof(sensorName) -1);
    
    saveConfig();

    server.send(200, "text/html", "Config successful. Rebooting");

    ESP.restart();
  }

  server.send(200, "text/html", "<script>window.onload = function() { window.location = \"/\"; }</script>");
}

void handleCss(){
    if(SPIFFS.exists("/style.css")){

      File file = SPIFFS.open("/style.css", "r");

      server.streamFile(file, "text/css");

      file.close();
    }
    else{
      server.send(404, "file doesn't exist");
    }
}

void handleNotFound(){
    if(SPIFFS.exists("/index.html")){

      File file = SPIFFS.open("/index.html", "r");

      server.streamFile(file, "text/html");

      file.close();
    }
    else{
      server.send(404, "file doesn't exist");
    }
}

/** Store WLAN credentials to EEPROM */
void saveConfig() {
  EEPROM.begin(512);
  EEPROM.put(0, ssid);
  EEPROM.put(0+sizeof(ssid), password);
  EEPROM.put(0+sizeof(ssid)+sizeof(password), sensorName);
  EEPROM.commit();
  EEPROM.end();
}

void loadCredentials() {
  EEPROM.begin(512);
  EEPROM.get(0, ssid);
  EEPROM.get(0+sizeof(ssid), password);
  EEPROM.get(0+sizeof(ssid)+sizeof(password), sensorName);
  EEPROM.end();
  
  Serial.println("Recovered credentials:");
  Serial.println(ssid);
  Serial.println(password);
  Serial.println(sensorName);
}
```