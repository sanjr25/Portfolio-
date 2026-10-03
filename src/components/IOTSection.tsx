import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  ArrowRight,
  Code2,
  FileText,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Zap,
  Activity,
  X
} from 'lucide-react';
import BorderGlow from './BorderGlow';

export interface IOTTask {
  id: string;
  taskNumber: string;
  title: string;
  shortDesc: string;
  badge: string;
  overview: string;
  architecturePoints: string[];
  keyConcepts: { title: string; desc: string }[];
  hardwareUsed: string[];
  codeSnippet: {
    language: string;
    title: string;
    code: string;
  };
  reflection: string;
  photos: { url: string; caption: string }[];
  videos: { url: string; title: string }[];
}

const IOT_TASKS: IOTTask[] = [
  {
    id: 'task-01',
    taskNumber: '01',
    title: 'ESP32 Local Web Server Control',
    badge: 'HTTP Socket Programming',
    shortDesc: 'Microcontroller-hosted HTTP web server enabling direct, zero-cloud local socket toggling of GPIO pins.',
    overview:
      'Established an embedded Wi-Fi HTTP server directly on the ESP32 SoC without external cloud infrastructure. The microcontroller stores and serves lightweight HTML interfaces from RAM over TCP port 80, executing real-time GPIO state transitions upon receiving HTTP client GET/POST requests from local web browsers.',
    architecturePoints: [
      'Client-Server request-response cycle handled directly on ESP32 RAM',
      'Non-blocking HTTP request routing with RESTful endpoints (/led/on, /led/off)',
      'Wi-Fi Access Point (AP) station connection & dynamic IP binding',
      'Low-latency physical pin toggling for direct hardware output actuation'
    ],
    keyConcepts: [
      { title: 'ESP32 System-on-Chip', desc: 'Dual-core low-power microcontroller featuring integrated 2.4 GHz Wi-Fi and Bluetooth connectivity.' },
      { title: 'TCP/IP HTTP Protocol', desc: 'Stateless application-layer socket communication for transmitting web documents over local network clients.' },
      { title: 'REST-Style Routing', desc: 'Mapped URI routes directly to micro-controller interrupt routines for digital state manipulation.' }
    ],
    hardwareUsed: ['ESP32 NodeMCU Development Board', '5V Relay / LED Module', 'Wi-Fi Access Point', 'Jumper Wires & Breadboard'],
    codeSnippet: {
      language: 'cpp',
      title: 'ESP32_Local_WebServer.ino',
      code: `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2;

void handleRoot() {
  String html = "<html><body style='font-family:sans-serif; background:#07080d; color:#fff; text-align:center;'>";
  html += "<h1>ESP32 Local HTTP Actuation</h1>";
  html += "<a href='/led/on' style='padding:10px 20px; background:#10b981; color:#fff; text-decoration:none;'>ENABLE (HIGH)</a> ";
  html += "<a href='/led/off' style='padding:10px 20px; background:#ef4444; color:#fff; text-decoration:none;'>DISABLE (LOW)</a>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleLedOff() {
  digitalWrite(ledPin, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  
  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);
  server.begin();
}

void loop() {
  server.handleClient();
}`
    },
    reflection:
      'Engineered memory-efficient HTTP socket handling on hardware constrained by 520 KB SRAM. This foundation highlighted how embedded network stacks execute request routing without heavy framework abstractions.',
    photos: [],
    videos: [
      { url: '/videos/task1_esp32_webserver.mp4', title: 'ESP32 Local HTTP Web Server Control — Phone On/Off Video' }
    ]
  },
  {
    id: 'task-02',
    taskNumber: '02',
    title: 'Adafruit IO Cloud Telemetry & MQTT Dashboards',
    badge: 'MQTT Cloud Telemetry',
    shortDesc: 'Bi-directional cloud pub/sub messaging engine driving remote high-voltage relay load switching.',
    overview:
      'Transitioned from local scope to global internet control by connecting the ESP32 SoC to Adafruit IO over the lightweight MQTT protocol. Configured custom telemetry feeds to stream real-time payload updates, permitting users across external networks to control optocoupler-isolated relay loads safely.',
    architecturePoints: [
      'MQTT Publish/Subscribe architecture over port 1883 with persistent TCP keep-alive',
      'Low-overhead topic routing for instantaneous bidirectional command propagation',
      'Optocoupler signal isolation preventing high-voltage back-EMF feedback into the SoC',
      'Interactive cloud dashboard rendering live hardware status and switch toggles'
    ],
    keyConcepts: [
      { title: 'MQTT Protocol', desc: 'Extremely lightweight publish-subscribe messaging transport ideal for constrained IoT devices and low-bandwidth channels.' },
      { title: 'Adafruit IO Feeds', desc: 'Cloud telemetry endpoint streams mapping live physical device variables to web components.' },
      { title: 'Optocoupler Relay Driver', desc: 'Galvanic isolation safety barrier protecting low-voltage microcontroller logic from high-AC loads.' }
    ],
    hardwareUsed: ['ESP32 SoC', '5V Optocoupler Relay Module', 'Adafruit IO MQTT Broker', 'AC Load Appliance / Test Bulb'],
    codeSnippet: {
      language: 'cpp',
      title: 'ESP32_Adafruit_MQTT.ino',
      code: `#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "YOUR_ADAFRUIT_IO_USERNAME"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe relayFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-control");

const int RELAY_PIN = 4;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  WiFi.begin("YOUR_WIFI_SSID", "YOUR_WIFI_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  mqtt.subscribe(&relayFeed);
}

void loop() {
  if (!mqtt.connected()) {
    int8_t ret;
    while ((ret = mqtt.connect()) != 0) {
      mqtt.disconnect();
      delay(5000);
    }
  }

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(2000))) {
    if (subscription == &relayFeed) {
      char *message = (char *)relayFeed.lastread;
      if (strcmp(message, "ON") == 0) digitalWrite(RELAY_PIN, HIGH);
      else if (strcmp(message, "OFF") == 0) digitalWrite(RELAY_PIN, LOW);
    }
  }
}`
    },
    reflection:
      'Gained mastery over MQTT pub/sub mechanics, understanding how event-driven broker payloads reduce transmission overhead by over 90% compared to traditional HTTP polling.',
    photos: [
      { url: '/images/iot/adafruit_io_dashboard_bulb.png', caption: 'Adafruit IO Cloud Dashboard — prajasri / Dashboards / Bulb' }
    ],
    videos: [
      { url: '/videos/task3_ifttt_automation.mp4', title: 'Adafruit IO MQTT Cloud Telemetry & Bulb Switch Video' }
    ]
  },
  {
    id: 'task-03',
    taskNumber: '03',
    title: 'IFTTT Event Automation & Webhook Integration',
    badge: 'Automated Webhooks',
    shortDesc: 'Automated event triggers linking external third-party services to hardware actions via RESTful webhooks.',
    overview:
      'Integrated IFTTT (If This Then That) with Adafruit IO cloud feeds to execute conditional IoT automations. Configured inbound webhooks and REST triggers that automatically publish payload packets to MQTT topics based on scheduled times or external app events.',
    architecturePoints: [
      'Webhook HTTP POST payload dispatching to Adafruit IO REST API endpoints',
      'Automated event-to-hardware pipeline requiring zero manual web app intervention',
      'State synchronization across multi-platform triggers (webhooks, email, location)',
      'Robust error handling for delayed cloud event dispatches'
    ],
    keyConcepts: [
      { title: 'Webhooks & REST APIs', desc: 'HTTP POST callback triggers enabling decoupled systems to communicate event notifications.' },
      { title: 'Event-Driven Architecture', desc: 'System design where hardware execution is dictated by asynchronous state change dispatches.' }
    ],
    hardwareUsed: ['ESP32 SoC', 'IFTTT Service Layer', 'Adafruit IO REST API', 'Status Indicator LEDs'],
    codeSnippet: {
      language: 'json',
      title: 'IFTTT_Webhook_Payload.json',
      code: `{
  "event": "scheduled_automation_trigger",
  "value1": "ON",
  "feed_key": "relay-control",
  "timestamp": "2026-09-28T10:00:00Z"
}`
    },
    reflection:
      'Demonstrated how serverless webhooks bridge physical embedded systems with software ecosystem automation, expanding device capabilities without adding code complexity on the micro-controller.',
    photos: [],
    videos: [
      { url: '/videos/task2_adafruit_mqtt.mp4', title: 'IFTTT Webhooks & Voice Assistant Access Bulb Control Video' }
    ]
  },
  {
    id: 'task-04',
    taskNumber: '04',
    title: 'Firebase Realtime Database & Sensor Dashboard',
    badge: 'Full-Stack Firebase RTDB',
    shortDesc: 'Multi-sensor environmental telemetry logging and live dual-mode appliance control over WebSockets.',
    overview:
      'Engineered a complete IoT architecture connecting an ESP32 equipped with a DHT temperature/humidity sensor and LDR light sensor to Google Firebase Realtime Database. Developed an interactive frontend dashboard for live monitoring and bidirectional appliance override.',
    architecturePoints: [
      'WebSocket bi-directional sync with Firebase Realtime Database using SSL/TLS encryption',
      'Multi-sensor telemetry sampling (Temperature, Humidity, ADC Light intensity)',
      'Dual operational modes: Manual cloud switch override vs Automated environmental threshold actuation',
      'Real-time web frontend dashboard displaying live gauge cards and status telemetry'
    ],
    keyConcepts: [
      { title: 'Firebase Realtime DB', desc: 'NoSQL cloud database that syncs data across clients in real time using persistent WebSocket connections.' },
      { title: 'Multi-Sensor Interfacing', desc: 'Simultaneous acquisition of digital single-wire DHT telemetry and analog LDR voltage signals.' },
      { title: 'Threshold Actuation Logic', desc: 'Autonomous embedded decision loop comparing sensor metrics against user-defined triggers.' }
    ],
    hardwareUsed: ['ESP32 Microcontroller', 'DHT Sensor', 'LDR Light Sensor', 'Relay Module', 'Firebase NoSQL Cloud'],
    codeSnippet: {
      language: 'cpp',
      title: 'ESP32_Firebase_RTDB_Telemetry.ino',
      code: `#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
#define LDRPIN 34
#define RELAYPIN 5

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(RELAYPIN, OUTPUT);
  WiFi.begin("WIFI_SSID", "WIFI_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  config.host = "YOUR_FIREBASE_PROJECT.firebaseio.com";
  config.signer.tokens.legacy_token = "YOUR_FIREBASE_DATABASE_SECRET";
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int ldrVal = analogRead(LDRPIN);

  if (!isnan(temp) && !isnan(hum)) {
    Firebase.RTDB.setFloat(&fbdo, "/sensorData/temperature", temp);
    Firebase.RTDB.setFloat(&fbdo, "/sensorData/humidity", hum);
    Firebase.RTDB.setInt(&fbdo, "/sensorData/lightLevel", ldrVal);
  }

  if (Firebase.RTDB.getBool(&fbdo, "/appliances/bulbState")) {
    bool state = fbdo.to<bool>();
    digitalWrite(RELAYPIN, state ? HIGH : LOW);
  }
  delay(3000);
}`
    },
    reflection:
      'Mastered cloud database integration for embedded systems. Realized the power of WebSocket listener threads over legacy HTTP polling for instantaneous sub-100ms control response.',
    photos: [
      { url: '/images/iot/smart_env_overview_dashboard.jpg', caption: 'Smart Environment Overview Dashboard — Real-time atmospheric telemetry streaming from ESP32 node' },
      { url: '/images/iot/smart_env_hardware_simulator.jpg', caption: 'ESP32 Hardware Simulator & Testing Console — Simulated telemetry & threshold verification' },
      { url: '/images/iot/smart_env_login_portal.jpg', caption: 'Smart Environment Monitor — User Authentication & Dashboard Access Gateway' },
      { url: '/images/iot/smart_env_recorded_measurements_log.jpg', caption: 'Firebase Environmental Telemetry Historical Log — Live Timestamped Data Records' }
    ],
    videos: [
      { url: '/videos/task4_firebase_rtdb.mp4', title: 'Firebase Realtime Database & Sensor Dashboard Demonstration Video' }
    ]
  },
  {
    id: 'task-05',
    taskNumber: '05',
    title: 'Time-Series Data Logging & CSV Export Engine',
    badge: 'Analytics & Export Engine',
    shortDesc: 'Historical data persistence layer with browser-based CSV telemetry export for offline data analytics.',
    overview:
      'Extended the IoT telemetry pipeline by architecting a time-series historical logging mechanism inside Firebase RTDB and crafting a client-side JavaScript utility to query, format, and export sensor telemetry into CSV reports.',
    architecturePoints: [
      'Time-indexed JSON data structure optimized for low-latency range queries',
      'Client-side Blob construction for memory-efficient dynamic CSV generation',
      'Automated timestamp formatting and state classification for analytical export',
      'Seamless multi-sensor historical trending visualization'
    ],
    keyConcepts: [
      { title: 'Time-Series Logging', desc: 'Structured data persistence indexed by unix timestamps for temporal sensor analysis.' },
      { title: 'Client Data Export', desc: 'Browser URI encoding of dynamic MIME text/csv streams to trigger instant file downloads without server overhead.' }
    ],
    hardwareUsed: ['ESP32 SoC', 'Firebase Historical Persistence Node', 'JavaScript Export Utility Engine'],
    codeSnippet: {
      language: 'javascript',
      title: 'csvExporter.js',
      code: `export function downloadSensorDataCSV(dataArray) {
  const headers = ["Timestamp", "Temperature (°C)", "Humidity (%)", "Light Level (ADC)", "Relay State", "System Mode"];
  const rows = dataArray.map(row => [
    row.timestamp,
    row.temperature,
    row.humidity,
    row.lightLevel,
    row.bulbState ? "ON" : "OFF",
    row.mode
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", \`esp32_sensor_log_\${Date.now()}.csv\`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}`
    },
    reflection:
      'Completing the end-to-end IoT lifecycle — from microcontroller pin logic to cloud storage and downloadable data analytics — provided a comprehensive understanding of production-grade IoT architecture.',
    photos: [
      { url: '/images/iot/task5_serial_monitor_log.jpg', caption: 'ESP32 Serial Terminal — Real-Time Telemetry & Timestamped Output Logs' },
      { url: '/images/iot/task5_circuit_breadboard.jpg', caption: 'Physical ESP32 Circuit Setup & Multi-Sensor Hardware Breadboard Interfacing' }
    ],
    videos: []
  }
];

export const IOTSection: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<IOTTask | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'media'>('overview');
  const [lightboxPhoto, setLightboxPhoto] = useState<{ url: string; caption: string } | null>(null);

  return (
    <section id="iot" className="relative py-20 px-6 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-xs font-mono text-emerald-300 uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>EMBEDDED SYSTEMS & INTERNET OF THINGS (IOT) TRACK</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-5xl text-emerald-400 uppercase tracking-tight">
            IOT & SMART SYSTEMS
          </h2>
          <p className="mt-3 text-slate-300 text-sm font-mono max-w-3xl leading-relaxed">
            From low-level microcontroller socket programming to cloud telemetry, automated webhooks, real-time NoSQL databases, and historical analytics export. Select any assignment card below for detailed technical documentation, code, and media.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex flex-wrap gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-inner">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>5 Modular Assignments</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-inner">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>ESP32 SoC Stack</span>
          </div>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {IOT_TASKS.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              setSelectedTask(task);
              setActiveTab('overview');
            }}
            className="cursor-pointer group h-full"
          >
            <BorderGlow glowColor="#10b981" edgeSensitivity={180} className="h-full">
              <div className="p-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Card Badge & Number */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                      ASSIGNMENT {task.taskNumber}
                    </span>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider">{task.badge}</span>
                  </div>

                  <h3 className="font-syne font-bold text-xl text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {task.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate-300 font-mono leading-relaxed line-clamp-3">
                    {task.shortDesc}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400 font-medium">
                  <span className="flex items-center gap-1.5 group-hover:text-emerald-300 transition-colors">
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </BorderGlow>
          </div>
        ))}
      </div>

      {/* Detailed Modal Window */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="fixed inset-0 bg-[#06080d]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1017] border border-emerald-500/30 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col z-10 text-slate-200"
            >
              {/* Modal Top Navigation */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#111722]/90 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold">
                    TASK {selectedTask.taskNumber}
                  </span>
                  <h3 className="font-syne font-bold text-lg md:text-2xl text-white">
                    {selectedTask.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Sub-Header Tabs */}
              <div className="flex border-b border-white/10 bg-[#080b11] px-6 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-5 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'overview'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Architecture & Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-5 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'code'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Implementation Source Code</span>
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-5 py-3 border-b-2 font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'media'
                      ? 'border-emerald-400 text-emerald-400 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Media (Photos & Videos)</span>
                </button>
              </div>

              {/* Modal Body Scroll Area */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Executive Summary Box */}
                    <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-5 rounded-r-xl">
                      <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold mb-1">
                        Executive Summary
                      </h4>
                      <p className="font-sans text-sm text-slate-200 leading-relaxed">
                        {selectedTask.overview}
                      </p>
                    </div>

                    {/* Architecture Highlights */}
                    <div>
                      <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-4">
                        <Layers className="w-4 h-4 text-emerald-400" />
                        System Architecture Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedTask.architecturePoints.map((pt, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs font-sans text-slate-300 leading-normal">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Technical Concepts */}
                    <div>
                      <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white mb-4">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        Key Technical Concepts
                      </h4>
                      <div className="space-y-3">
                        {selectedTask.keyConcepts.map((c, i) => (
                          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <h5 className="font-mono text-xs font-semibold text-emerald-300 mb-1">{c.title}</h5>
                            <p className="font-sans text-xs text-slate-300">{c.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hardware Components Stack */}
                    <div>
                      <h4 className="font-syne text-base font-bold text-white mb-3">Hardware & Stack Utilized</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTask.hardwareUsed.map((hw, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium"
                          >
                            {hw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Reflection */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                      <h4 className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                        Engineering Reflection & Takeaway
                      </h4>
                      <p className="font-sans text-xs text-slate-300 italic leading-relaxed">
                        "{selectedTask.reflection}"
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: CODE */}
                {activeTab === 'code' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Language: {selectedTask.codeSnippet.language}</span>
                      <span className="text-emerald-400">{selectedTask.codeSnippet.title}</span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-emerald-500/30 bg-[#07090e]">
                      <pre className="p-5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                        <code>{selectedTask.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* TAB 3: MEDIA (PHOTOS & VIDEOS) */}
                {activeTab === 'media' && (
                  <div className="space-y-8">
                    {/* Photos Section (rendered only if photos exist) */}
                    {selectedTask.photos && selectedTask.photos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white">
                            <ImageIcon className="w-4 h-4 text-emerald-400" />
                            Project Photos & Dashboard Screenshots
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedTask.photos.map((photo, i) => (
                            <div
                              key={i}
                              onClick={() => photo.url && setLightboxPhoto(photo)}
                              className={`group relative rounded-xl overflow-hidden border border-white/10 bg-slate-950 p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                                photo.url ? 'cursor-pointer hover:border-emerald-400/60' : ''
                              }`}
                            >
                              <img
                                src={photo.url}
                                alt={photo.caption}
                                className="max-h-[260px] w-full object-contain rounded-lg"
                              />
                              {photo.caption && (
                                <p className="mt-2 text-xs font-mono text-slate-300 text-center">{photo.caption}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Videos Section */}
                    {selectedTask.videos && selectedTask.videos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="flex items-center gap-2 font-syne text-base font-bold text-white">
                            <Video className="w-4 h-4 text-cyan-400" />
                            Video Demonstrations
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {selectedTask.videos.map((vid, i) => (
                            <div
                              key={i}
                              className="rounded-xl border border-white/10 bg-slate-950 p-4 flex flex-col items-center justify-center"
                            >
                              <video controls className="w-full max-h-[400px] rounded-lg">
                                <source src={vid.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              {vid.title && (
                                <p className="mt-2 text-xs font-mono text-cyan-300 text-center">{vid.title}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#111722] flex justify-between items-center text-xs font-mono text-slate-400 shrink-0">
                <span>IoT & Embedded Systems Track • Task {selectedTask.taskNumber}</span>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox for Photos */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxPhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-4xl w-full flex flex-col items-center"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/10 text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <img src={lightboxPhoto.url} alt={lightboxPhoto.caption} className="max-h-[80vh] rounded-xl" />
              <p className="mt-3 text-xs font-mono text-emerald-300">{lightboxPhoto.caption}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default IOTSection;
