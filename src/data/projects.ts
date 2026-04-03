export interface ConnectionStep {
  step: number;
  instruction: string;
  pin: string;
  wireColor: "red" | "black" | "yellow" | "blue" | "green" | "orange" | "white" | "purple";
}

export interface Component {
  name: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  classLevel: "6" | "7" | "8" | "additional";
  difficulty: "easy" | "medium" | "hard";
  description: string;
  videoUrl?: string;
  whatYouLearn: string[];
  components: Component[];
  connectionSteps: ConnectionStep[];
  signalExplanation: string[];
  code: string;
  codeExplanation: string[];
}

export const projects: Project[] = [
  // ===== CLASS 6 =====
  {
    id: "automatic-street-light",
    title: "Automatic Street Light",
    classLevel: "6",
    difficulty: "easy",
    description: "Build a smart street light that turns ON automatically when it gets dark and OFF when there's light — just like real street lights! Uses an LDR (Light Dependent Resistor) to sense brightness.",
    videoUrl: "https://www.youtube.com/watch?v=YNVfPrFtTno",
    whatYouLearn: [
      "How light sensors (LDR) detect brightness",
      "How to use analog input to read sensor values",
      "How to control an LED based on sensor data",
      "Real-world application: automatic street lighting"
    ],
    components: [
      { name: "Arduino UNO", description: "The brain of your project — a small computer that runs your code", icon: "Cpu" },
      { name: "LDR Sensor", description: "Light Dependent Resistor — resistance changes with light (less light = more resistance)", icon: "Sun" },
      { name: "LED", description: "Light Emitting Diode — a tiny light that turns on when electricity flows through it", icon: "Lightbulb" },
      { name: "220Ω Resistor", description: "Protects the LED from too much current", icon: "Minus" },
      { name: "Breadboard", description: "A board for connecting components without soldering", icon: "LayoutGrid" },
      { name: "Jumper Wires", description: "Wires to connect everything together", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect the LDR sensor's VCC pin to 5V on Arduino", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect the LDR sensor's GND pin to GND on Arduino", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect the LDR sensor's analog output to A0 on Arduino", pin: "A0", wireColor: "yellow" },
      { step: 4, instruction: "Connect LED's longer leg (+) to pin 9 through a 220Ω resistor", pin: "D9", wireColor: "green" },
      { step: 5, instruction: "Connect LED's shorter leg (-) to GND on Arduino", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: [
      "A0 reads the LDR value (0-1023). Low value = bright light, High value = dark.",
      "Pin 9 sends HIGH (5V) to turn LED ON or LOW (0V) to turn LED OFF.",
      "When LDR reading > 500 (dark), Arduino turns on the LED street light."
    ],
    code: `// Automatic Street Light using LDR
// Class 6 - STEM Robotics Kit

int ldrPin = A0;    // LDR sensor connected to analog pin A0
int ledPin = 9;     // LED connected to digital pin 9
int ldrValue = 0;   // Variable to store LDR reading

void setup() {
  pinMode(ledPin, OUTPUT);     // Set LED pin as output
  Serial.begin(9600);          // Start serial monitor for debugging
  Serial.println("Street Light System Ready!");
}

void loop() {
  ldrValue = analogRead(ldrPin);  // Read light level (0-1023)
  Serial.print("Light Level: ");
  Serial.println(ldrValue);
  
  if (ldrValue > 500) {           // If it's dark (high resistance)
    digitalWrite(ledPin, HIGH);   // Turn ON the street light
    Serial.println("STATUS: Dark - Light ON");
  } else {                        // If it's bright
    digitalWrite(ledPin, LOW);    // Turn OFF the street light
    Serial.println("STATUS: Bright - Light OFF");
  }
  
  delay(500);  // Wait half a second before next reading
}`,
    codeExplanation: [
      "We define which pins the LDR and LED are connected to",
      "setup() runs once — sets LED as output and starts serial monitor",
      "loop() runs forever — reads light level, decides to turn light on/off",
      "analogRead() gives a number 0-1023 based on brightness",
      "If dark (>500), we send HIGH to LED. If bright, we send LOW"
    ]
  },
  {
    id: "alcohol-detector-buzzer",
    title: "Alcohol Detector & Buzzer",
    classLevel: "6",
    difficulty: "easy",
    description: "Create a safety device that detects alcohol or gas in the air and sounds a buzzer alarm! Uses an MQ-3 gas sensor to sniff the air.",
    videoUrl: "https://www.youtube.com/watch?v=y-9CR5xC7Bk",
    whatYouLearn: [
      "How gas sensors detect chemicals in the air",
      "How to read analog sensor values",
      "How to trigger a buzzer alarm based on readings",
      "Real-world application: breathalyzer, gas safety"
    ],
    components: [
      { name: "Arduino UNO", description: "The brain that processes sensor data and controls the buzzer", icon: "Cpu" },
      { name: "MQ-3 Gas Sensor", description: "Detects alcohol and gases — resistance drops when it smells alcohol", icon: "Wind" },
      { name: "Buzzer", description: "Makes a loud beeping sound when activated", icon: "Volume2" },
      { name: "LED", description: "Red warning light", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "For connecting all components", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect MQ-3 sensor VCC to 5V on Arduino", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect MQ-3 sensor GND to GND on Arduino", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect MQ-3 analog output to A0 on Arduino", pin: "A0", wireColor: "yellow" },
      { step: 4, instruction: "Connect Buzzer positive (+) to pin 8 on Arduino", pin: "D8", wireColor: "orange" },
      { step: 5, instruction: "Connect Buzzer negative (-) to GND", pin: "GND", wireColor: "black" },
      { step: 6, instruction: "Connect LED anode (+) through 220Ω resistor to pin 7", pin: "D7", wireColor: "green" },
      { step: 7, instruction: "Connect LED cathode (-) to GND", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: [
      "A0 reads the gas concentration (0-1023). Higher value = more alcohol detected.",
      "Pin 8 sends HIGH to buzz the alarm when alcohol is detected.",
      "Pin 7 turns on a red LED as a visual warning."
    ],
    code: `// Alcohol Detector with Buzzer Alarm
// Class 6 - STEM Robotics Kit

int gasSensor = A0;   // MQ-3 sensor on analog pin A0
int buzzerPin = 8;    // Buzzer on digital pin 8
int ledPin = 7;       // Warning LED on pin 7
int gasValue = 0;     // Variable for sensor reading

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Alcohol Detector Ready!");
  Serial.println("Warming up sensor...");
  delay(2000);  // Let sensor warm up
}

void loop() {
  gasValue = analogRead(gasSensor);  // Read gas level
  Serial.print("Gas Level: ");
  Serial.println(gasValue);
  
  if (gasValue > 400) {              // Alcohol detected!
    digitalWrite(buzzerPin, HIGH);   // Sound the alarm
    digitalWrite(ledPin, HIGH);      // Turn on warning LED
    Serial.println("⚠️ ALCOHOL DETECTED! ALARM ON!");
    delay(200);
    digitalWrite(buzzerPin, LOW);    // Beep pattern
    delay(200);
  } else {                           // Air is clean
    digitalWrite(buzzerPin, LOW);    // Alarm off
    digitalWrite(ledPin, LOW);       // LED off
    Serial.println("✅ Air is clean");
  }
  
  delay(300);
}`,
    codeExplanation: [
      "MQ-3 sensor reads air quality through analog pin A0",
      "If gas level exceeds 400, the alarm triggers",
      "Buzzer beeps in a pattern (ON/OFF) for attention",
      "LED gives visual warning alongside the buzzer",
      "Serial monitor shows readings for debugging"
    ]
  },
  {
    id: "tilt-alert-system",
    title: "Tilt Alert System",
    classLevel: "6",
    difficulty: "easy",
    description: "Build an alert system that detects when something tilts or falls over! Uses a tilt sensor (ball switch) to detect changes in orientation — great for theft alert or earthquake warning.",
    videoUrl: "https://www.youtube.com/watch?v=7nJ0hSR6NIc",
    whatYouLearn: [
      "How tilt sensors detect orientation changes",
      "How to use digital input (HIGH/LOW)",
      "How to trigger alerts with LED and buzzer",
      "Real-world application: anti-theft, earthquake alert"
    ],
    components: [
      { name: "Arduino UNO", description: "Processes the tilt signal and controls outputs", icon: "Cpu" },
      { name: "Tilt Sensor", description: "A small tube with a metal ball — when tilted, the ball rolls and breaks/makes the circuit", icon: "RotateCcw" },
      { name: "Buzzer", description: "Sounds an alarm when tilt is detected", icon: "Volume2" },
      { name: "LED", description: "Warning light that turns on during tilt", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "For connecting components", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect one leg of tilt sensor to pin 2 on Arduino", pin: "D2", wireColor: "yellow" },
      { step: 2, instruction: "Connect other leg of tilt sensor to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect Buzzer (+) to pin 8 on Arduino", pin: "D8", wireColor: "orange" },
      { step: 4, instruction: "Connect Buzzer (-) to GND", pin: "GND", wireColor: "black" },
      { step: 5, instruction: "Connect LED (+) through resistor to pin 9", pin: "D9", wireColor: "green" },
      { step: 6, instruction: "Connect LED (-) to GND", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: [
      "Pin 2 reads HIGH when the sensor is upright (ball making contact).",
      "Pin 2 reads LOW when tilted (ball rolls away from contacts).",
      "We use INPUT_PULLUP so no external resistor is needed for the tilt sensor."
    ],
    code: `// Tilt Alert System
// Class 6 - STEM Robotics Kit

int tiltPin = 2;     // Tilt sensor on digital pin 2
int buzzerPin = 8;   // Buzzer on pin 8
int ledPin = 9;      // LED on pin 9

void setup() {
  pinMode(tiltPin, INPUT_PULLUP);  // Internal pull-up resistor
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Tilt Alert System Ready!");
}

void loop() {
  int tiltState = digitalRead(tiltPin);
  
  if (tiltState == LOW) {            // Tilted!
    digitalWrite(buzzerPin, HIGH);   // Sound alarm
    digitalWrite(ledPin, HIGH);      // Warning light ON
    Serial.println("🚨 TILT DETECTED! Object has moved!");
    delay(100);
    digitalWrite(buzzerPin, LOW);
    delay(100);
  } else {                           // Upright - safe
    digitalWrite(buzzerPin, LOW);
    digitalWrite(ledPin, LOW);
    Serial.println("✅ Object is stable");
  }
  
  delay(200);
}`,
    codeExplanation: [
      "INPUT_PULLUP means the pin reads HIGH normally (no extra resistor needed)",
      "When tilted, the sensor breaks the circuit → pin reads LOW",
      "Buzzer beeps rapidly to create an alarm effect",
      "LED provides visual feedback alongside the sound",
      "200ms delay between reads prevents false triggers"
    ]
  },

  // ===== CLASS 7 =====
  {
    id: "mini-timer",
    title: "Mini Timer (LED Blink & Beep)",
    classLevel: "7",
    difficulty: "medium",
    description: "Create a countdown timer that blinks an LED and beeps a buzzer! Set a timer, watch the LED blink as seconds count down, and hear a final alarm when time's up!",
    videoUrl: "https://www.youtube.com/watch?v=M8e6T-Hc9wE",
    whatYouLearn: [
      "How to use millis() for timing without blocking",
      "How to create blinking patterns with LEDs",
      "How to use buzzer for audio feedback",
      "Real-world application: kitchen timer, study timer"
    ],
    components: [
      { name: "Arduino UNO", description: "Controls the timer logic", icon: "Cpu" },
      { name: "LED", description: "Blinks during countdown", icon: "Lightbulb" },
      { name: "Buzzer", description: "Beeps when timer ends", icon: "Volume2" },
      { name: "Push Button", description: "Starts the timer", icon: "CircleDot" },
      { name: "220Ω Resistor", description: "Protects the LED", icon: "Minus" },
      { name: "Breadboard & Wires", description: "For connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect LED (+) through 220Ω resistor to pin 9", pin: "D9", wireColor: "green" },
      { step: 2, instruction: "Connect LED (-) to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect Buzzer (+) to pin 8", pin: "D8", wireColor: "orange" },
      { step: 4, instruction: "Connect Buzzer (-) to GND", pin: "GND", wireColor: "black" },
      { step: 5, instruction: "Connect one side of button to pin 2", pin: "D2", wireColor: "yellow" },
      { step: 6, instruction: "Connect other side of button to GND", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: [
      "Pin 2 reads the button press using INPUT_PULLUP (pressed = LOW).",
      "Pin 9 toggles the LED on and off to show countdown.",
      "Pin 8 sends pulses to the buzzer for the alarm tone."
    ],
    code: `// Mini Timer - LED Blink & Beep
// Class 7 - STEM Robotics Kit

int ledPin = 9;
int buzzerPin = 8;
int buttonPin = 2;
int timerSeconds = 10;   // Set timer to 10 seconds
bool timerRunning = false;
int countdown = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Mini Timer Ready!");
  Serial.println("Press button to start 10-second timer");
}

void loop() {
  // Check for button press to start timer
  if (digitalRead(buttonPin) == LOW && !timerRunning) {
    timerRunning = true;
    countdown = timerSeconds;
    Serial.println("⏱️ Timer started!");
    delay(300);  // Debounce
  }
  
  if (timerRunning && countdown > 0) {
    // Blink LED and beep
    Serial.print("Time remaining: ");
    Serial.print(countdown);
    Serial.println(" seconds");
    
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 1000, 100);  // Short beep
    delay(500);
    digitalWrite(ledPin, LOW);
    delay(500);
    
    countdown--;
  }
  
  if (timerRunning && countdown <= 0) {
    // Timer finished! Long alarm
    Serial.println("🔔 TIME'S UP!");
    for (int i = 0; i < 5; i++) {
      digitalWrite(ledPin, HIGH);
      tone(buzzerPin, 2000, 300);
      delay(400);
      digitalWrite(ledPin, LOW);
      delay(200);
    }
    timerRunning = false;
    Serial.println("Timer reset. Press button again.");
  }
  
  delay(100);
}`,
    codeExplanation: [
      "Button press starts the countdown (with debounce delay)",
      "Each second: LED blinks and buzzer beeps briefly",
      "tone() function generates sound at a specific frequency",
      "When countdown reaches 0, a longer alarm plays 5 times",
      "Timer auto-resets after alarm for reuse"
    ]
  },
  {
    id: "disco-robots",
    title: "Disco Robots (Blinking Eyes)",
    classLevel: "7",
    difficulty: "medium",
    description: "Make a fun disco light show with multiple LEDs that blink in cool patterns — like robot eyes at a dance party! Program different blinking sequences for amazing effects.",
    videoUrl: "https://www.youtube.com/watch?v=dDp6VRjKGJM",
    whatYouLearn: [
      "How to control multiple LEDs independently",
      "How to create sequential lighting patterns",
      "How to use arrays and loops in Arduino",
      "Real-world application: decorative lighting, signals"
    ],
    components: [
      { name: "Arduino UNO", description: "Controls all the LED patterns", icon: "Cpu" },
      { name: "5x LEDs (different colors)", description: "Red, Green, Blue, Yellow, White LEDs for the disco effect", icon: "Lightbulb" },
      { name: "5x 220Ω Resistors", description: "One resistor per LED for protection", icon: "Minus" },
      { name: "Breadboard & Wires", description: "For connecting all LEDs", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Red LED (+) through resistor to pin 3", pin: "D3", wireColor: "red" },
      { step: 2, instruction: "Connect Green LED (+) through resistor to pin 4", pin: "D4", wireColor: "green" },
      { step: 3, instruction: "Connect Blue LED (+) through resistor to pin 5", pin: "D5", wireColor: "blue" },
      { step: 4, instruction: "Connect Yellow LED (+) through resistor to pin 6", pin: "D6", wireColor: "yellow" },
      { step: 5, instruction: "Connect White LED (+) through resistor to pin 7", pin: "D7", wireColor: "white" },
      { step: 6, instruction: "Connect all LED (-) legs to GND rail on breadboard", pin: "GND", wireColor: "black" },
      { step: 7, instruction: "Connect breadboard GND rail to Arduino GND", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: [
      "Pins 3-7 each control one LED independently.",
      "HIGH (5V) turns an LED on, LOW (0V) turns it off.",
      "By controlling timing, we create cool patterns!"
    ],
    code: `// Disco Robots - Blinking LED Eyes
// Class 7 - STEM Robotics Kit

int leds[] = {3, 4, 5, 6, 7};  // 5 LED pins
int numLeds = 5;

void setup() {
  for (int i = 0; i < numLeds; i++) {
    pinMode(leds[i], OUTPUT);
  }
  Serial.begin(9600);
  Serial.println("🕺 Disco Robots Ready! Let's dance!");
}

// Pattern 1: Sequential chase
void chasePattern() {
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], HIGH);
    delay(100);
    digitalWrite(leds[i], LOW);
  }
}

// Pattern 2: All blink together
void blinkAll() {
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], HIGH);
  }
  delay(200);
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], LOW);
  }
  delay(200);
}

// Pattern 3: Alternating
void alternatePattern() {
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], i % 2 == 0 ? HIGH : LOW);
  }
  delay(300);
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], i % 2 == 0 ? LOW : HIGH);
  }
  delay(300);
}

// Pattern 4: Build up
void buildUp() {
  for (int i = 0; i < numLeds; i++) {
    digitalWrite(leds[i], HIGH);
    delay(150);
  }
  delay(300);
  for (int i = numLeds - 1; i >= 0; i--) {
    digitalWrite(leds[i], LOW);
    delay(150);
  }
}

void loop() {
  Serial.println("Pattern: Chase");
  for (int r = 0; r < 5; r++) chasePattern();
  
  Serial.println("Pattern: Blink All");
  for (int r = 0; r < 3; r++) blinkAll();
  
  Serial.println("Pattern: Alternate");
  for (int r = 0; r < 4; r++) alternatePattern();
  
  Serial.println("Pattern: Build Up");
  for (int r = 0; r < 3; r++) buildUp();
}`,
    codeExplanation: [
      "Array stores all 5 LED pin numbers for easy looping",
      "4 different patterns create the disco effect",
      "Chase: LEDs light up one after another like a running light",
      "Alternate: Even/odd LEDs swap on and off",
      "Build up: LEDs turn on one by one, then off in reverse"
    ]
  },
  {
    id: "automatic-door-gate",
    title: "Automatic Door/Gate (Servo)",
    classLevel: "7",
    difficulty: "medium",
    description: "Build an automatic door that opens when someone is detected nearby! Uses an ultrasonic sensor to measure distance and a servo motor to open/close the gate.",
    videoUrl: "https://www.youtube.com/watch?v=PjQHvv41Jz4",
    whatYouLearn: [
      "How servo motors rotate to specific angles",
      "How ultrasonic sensors measure distance",
      "How to combine sensors and actuators",
      "Real-world application: automatic doors, parking gates"
    ],
    components: [
      { name: "Arduino UNO", description: "Processes distance and controls the servo", icon: "Cpu" },
      { name: "Servo Motor (SG90)", description: "A motor that can rotate to exact angles (0° to 180°)", icon: "RotateCw" },
      { name: "Ultrasonic Sensor (HC-SR04)", description: "Sends sound waves and measures echo to find distance", icon: "Radio" },
      { name: "Breadboard & Wires", description: "For connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Ultrasonic VCC to 5V on Arduino", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect Ultrasonic GND to GND on Arduino", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect Ultrasonic TRIG to pin 3", pin: "D3", wireColor: "yellow" },
      { step: 4, instruction: "Connect Ultrasonic ECHO to pin 4", pin: "D4", wireColor: "blue" },
      { step: 5, instruction: "Connect Servo red wire to 5V", pin: "5V", wireColor: "red" },
      { step: 6, instruction: "Connect Servo brown/black wire to GND", pin: "GND", wireColor: "black" },
      { step: 7, instruction: "Connect Servo orange signal wire to pin 9", pin: "D9", wireColor: "orange" }
    ],
    signalExplanation: [
      "TRIG pin sends a short ultrasonic pulse.",
      "ECHO pin receives the reflected pulse — time taken = distance.",
      "Pin 9 sends PWM signal to servo: pulse width controls angle (0°-180°).",
      "Distance < 20cm → Open gate (servo to 90°). Distance > 20cm → Close (servo to 0°)."
    ],
    code: `// Automatic Door/Gate with Servo
// Class 7 - STEM Robotics Kit

#include <Servo.h>

Servo gateServo;         // Create servo object
int trigPin = 3;         // Ultrasonic trigger
int echoPin = 4;         // Ultrasonic echo
long duration;
int distance;

void setup() {
  gateServo.attach(9);    // Servo on pin 9
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  gateServo.write(0);     // Start with gate closed
  Serial.begin(9600);
  Serial.println("Automatic Gate Ready!");
}

int getDistance() {
  // Send ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Measure echo time
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;  // Convert to cm
  return distance;
}

void loop() {
  int dist = getDistance();
  Serial.print("Distance: ");
  Serial.print(dist);
  Serial.println(" cm");
  
  if (dist < 20 && dist > 0) {     // Someone is near!
    Serial.println("🚪 Gate OPENING...");
    gateServo.write(90);            // Open gate (90 degrees)
    delay(3000);                    // Keep open for 3 seconds
    Serial.println("🚪 Gate CLOSING...");
    gateServo.write(0);             // Close gate
  }
  
  delay(200);
}`,
    codeExplanation: [
      "Servo.h library lets us control servo motor easily",
      "getDistance() sends ultrasonic pulse and measures echo time",
      "Speed of sound formula converts time to centimeters",
      "When someone is within 20cm, gate opens to 90°",
      "Gate stays open 3 seconds, then closes automatically"
    ]
  },

  // ===== CLASS 8 =====
  {
    id: "automatic-smart-fan",
    title: "Automatic Smart Fan",
    classLevel: "8",
    difficulty: "hard",
    description: "Create a smart fan that turns on automatically when the temperature rises! Uses a temperature sensor to monitor room temp and controls a DC motor fan.",
    videoUrl: "https://www.youtube.com/watch?v=kyz9NSA0oow",
    whatYouLearn: [
      "How temperature sensors convert heat to voltage",
      "How to control motor speed with PWM (analogWrite)",
      "How to make automated climate control",
      "Real-world application: smart thermostat, auto AC"
    ],
    components: [
      { name: "Arduino UNO", description: "Reads temperature and controls fan speed", icon: "Cpu" },
      { name: "LM35 Temperature Sensor", description: "Outputs voltage proportional to temperature (10mV per °C)", icon: "Thermometer" },
      { name: "DC Motor + Fan", description: "The fan that cools the room", icon: "Fan" },
      { name: "Transistor (NPN)", description: "Acts as a switch to control the motor with Arduino", icon: "Zap" },
      { name: "Diode (1N4007)", description: "Protects against motor's back-EMF voltage spikes", icon: "ArrowRight" },
      { name: "Breadboard & Wires", description: "For connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect LM35 left pin (VCC) to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect LM35 middle pin (OUT) to A0", pin: "A0", wireColor: "yellow" },
      { step: 3, instruction: "Connect LM35 right pin (GND) to GND", pin: "GND", wireColor: "black" },
      { step: 4, instruction: "Connect transistor base through 1KΩ resistor to pin 9", pin: "D9", wireColor: "green" },
      { step: 5, instruction: "Connect transistor collector to motor negative", pin: "-", wireColor: "blue" },
      { step: 6, instruction: "Connect motor positive to 5V", pin: "5V", wireColor: "red" },
      { step: 7, instruction: "Connect transistor emitter to GND", pin: "GND", wireColor: "black" },
      { step: 8, instruction: "Connect diode across motor (cathode to +, anode to -)", pin: "-", wireColor: "white" }
    ],
    signalExplanation: [
      "A0 reads temperature voltage: each 10mV = 1°C.",
      "Pin 9 uses PWM (analogWrite 0-255) to control fan speed via transistor.",
      "Below 25°C → Fan OFF. 25-30°C → Low speed. 30-35°C → Medium. Above 35°C → Full speed."
    ],
    code: `// Automatic Smart Fan
// Class 8 - STEM Robotics Kit

int tempPin = A0;     // LM35 temperature sensor
int fanPin = 9;       // Fan motor (via transistor) on PWM pin
float temperature = 0;

void setup() {
  pinMode(fanPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Smart Fan System Ready!");
}

void loop() {
  // Read temperature
  int reading = analogRead(tempPin);
  temperature = (reading * 5.0 / 1024.0) * 100;  // Convert to Celsius
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print("°C  |  Fan: ");
  
  // Control fan speed based on temperature
  if (temperature < 25) {
    analogWrite(fanPin, 0);         // Fan OFF
    Serial.println("OFF");
  } else if (temperature < 30) {
    analogWrite(fanPin, 100);       // Low speed
    Serial.println("LOW (100/255)");
  } else if (temperature < 35) {
    analogWrite(fanPin, 180);       // Medium speed
    Serial.println("MEDIUM (180/255)");
  } else {
    analogWrite(fanPin, 255);       // Full speed!
    Serial.println("FULL SPEED! (255/255)");
  }
  
  delay(1000);  // Read every second
}`,
    codeExplanation: [
      "LM35 outputs 10mV per degree Celsius",
      "We convert analog reading (0-1023) to voltage, then to °C",
      "analogWrite() sends PWM signal (0=off, 255=full) for variable speed",
      "4 temperature zones with different fan speeds",
      "Transistor amplifies Arduino's small signal to drive the motor"
    ]
  },
  {
    id: "parking-light-system",
    title: "Parking Light System",
    classLevel: "8",
    difficulty: "hard",
    description: "Build a parking sensor that shows how close a car is using colored LEDs! Green = far away (safe), Yellow = getting closer, Red = too close — STOP! Just like real parking sensors.",
    videoUrl: "https://www.youtube.com/watch?v=ZERL0Jz_2v4",
    whatYouLearn: [
      "Advanced ultrasonic distance measurement",
      "Multi-LED indicator systems",
      "Range-based decision logic",
      "Real-world application: parking sensors in cars"
    ],
    components: [
      { name: "Arduino UNO", description: "Processes distance and controls indicator LEDs", icon: "Cpu" },
      { name: "Ultrasonic Sensor (HC-SR04)", description: "Measures distance to nearest object", icon: "Radio" },
      { name: "Green LED", description: "Far away — safe to move", icon: "Lightbulb" },
      { name: "Yellow LED", description: "Getting closer — slow down", icon: "Lightbulb" },
      { name: "Red LED", description: "Too close — stop!", icon: "Lightbulb" },
      { name: "Buzzer", description: "Beeps faster as object gets closer", icon: "Volume2" },
      { name: "Breadboard & Wires", description: "For connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Ultrasonic VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect Ultrasonic GND to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect Ultrasonic TRIG to pin 3", pin: "D3", wireColor: "yellow" },
      { step: 4, instruction: "Connect Ultrasonic ECHO to pin 4", pin: "D4", wireColor: "blue" },
      { step: 5, instruction: "Connect Green LED (+) through resistor to pin 5", pin: "D5", wireColor: "green" },
      { step: 6, instruction: "Connect Yellow LED (+) through resistor to pin 6", pin: "D6", wireColor: "yellow" },
      { step: 7, instruction: "Connect Red LED (+) through resistor to pin 7", pin: "D7", wireColor: "red" },
      { step: 8, instruction: "Connect all LED (-) to GND", pin: "GND", wireColor: "black" },
      { step: 9, instruction: "Connect Buzzer (+) to pin 8, (-) to GND", pin: "D8", wireColor: "orange" }
    ],
    signalExplanation: [
      "TRIG sends ultrasonic pulses, ECHO receives them.",
      "Distance > 50cm → Green LED only. 20-50cm → Yellow. < 20cm → Red + buzzer.",
      "Buzzer beep rate increases as distance decreases."
    ],
    code: `// Parking Light System
// Class 8 - STEM Robotics Kit

int trigPin = 3;
int echoPin = 4;
int greenLed = 5;
int yellowLed = 6;
int redLed = 7;
int buzzerPin = 8;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Parking Sensor Ready!");
}

int getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  return duration * 0.034 / 2;
}

void allOff() {
  digitalWrite(greenLed, LOW);
  digitalWrite(yellowLed, LOW);
  digitalWrite(redLed, LOW);
  noTone(buzzerPin);
}

void loop() {
  int distance = getDistance();
  allOff();
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print(" cm → ");
  
  if (distance > 50) {
    // Far away - safe (green)
    digitalWrite(greenLed, HIGH);
    Serial.println("🟢 SAFE - Keep moving");
  } else if (distance > 20) {
    // Getting close - caution (yellow)
    digitalWrite(yellowLed, HIGH);
    tone(buzzerPin, 1000, 100);  // Slow beep
    Serial.println("🟡 CAUTION - Slow down");
  } else if (distance > 5) {
    // Very close - danger (red)
    digitalWrite(redLed, HIGH);
    tone(buzzerPin, 2000, 50);   // Fast beep
    Serial.println("🔴 DANGER - Almost there!");
  } else {
    // Too close! All lights + continuous buzz
    digitalWrite(redLed, HIGH);
    digitalWrite(yellowLed, HIGH);
    tone(buzzerPin, 3000);       // Continuous alarm
    Serial.println("🚨 STOP! TOO CLOSE!");
  }
  
  delay(200);
}`,
    codeExplanation: [
      "Same ultrasonic distance function as the gate project",
      "4 distance zones with different LED and buzzer responses",
      "Green (>50cm): Safe. Yellow (20-50cm): Caution. Red (<20cm): Danger",
      "Buzzer pitch increases as distance decreases",
      "All LEDs and buzzer turn on when critically close (<5cm)"
    ]
  },
  {
    id: "smart-scale",
    title: "Smart Scale (Distance Measurement)",
    classLevel: "8",
    difficulty: "hard",
    description: "Build a smart measuring device that shows distance on screen! Uses ultrasonic sensor with precise measurement and displays results — a digital ruler that works without touching!",
    videoUrl: "https://www.youtube.com/watch?v=ZqQgxgnH9wg",
    whatYouLearn: [
      "Precise ultrasonic distance calculation",
      "Serial monitor as a display",
      "Averaging multiple readings for accuracy",
      "Real-world application: digital measuring tools"
    ],
    components: [
      { name: "Arduino UNO", description: "Calculates distance from sensor data", icon: "Cpu" },
      { name: "Ultrasonic Sensor (HC-SR04)", description: "Sends/receives sound waves for distance", icon: "Radio" },
      { name: "OLED Display (SSD1306)", description: "Shows distance on screen", icon: "Monitor" },
      { name: "Breadboard & Wires", description: "For connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Ultrasonic VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect Ultrasonic GND to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect Ultrasonic TRIG to pin 3", pin: "D3", wireColor: "yellow" },
      { step: 4, instruction: "Connect Ultrasonic ECHO to pin 2", pin: "D2", wireColor: "blue" },
      { step: 5, instruction: "Connect OLED VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 6, instruction: "Connect OLED GND to GND", pin: "GND", wireColor: "black" },
      { step: 7, instruction: "Connect OLED SDA to A4", pin: "A4", wireColor: "white" },
      { step: 8, instruction: "Connect OLED SCL to A5", pin: "A5", wireColor: "green" }
    ],
    signalExplanation: [
      "TRIG sends 10μs pulse. ECHO receives reflected signal.",
      "Time × speed of sound ÷ 2 = distance in cm.",
      "We take 5 readings and average them for better accuracy."
    ],
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Ultrasonic pins
int trigPin = 3;
int echoPin = 2;

long duration;
int distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  Serial.begin(9600);

  // Initialize OLED
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED not found");
    while(true);
  }

  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(WHITE);
}

void loop() {
  // Trigger pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read echo
  duration = pulseIn(echoPin, HIGH);

  // Convert to cm
  distance = duration * 0.034 / 2;

  // Serial output
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // OLED display
  display.clearDisplay();
  display.setCursor(0, 20);
  display.print(distance);
  display.print(" cm");
  display.display();

  delay(300);
}`,
    codeExplanation: [
      "Uses OLED display (SSD1306) for visual output",
      "Triggers 10μs ultrasonic pulse for distance measurement",
      "Calculates distance using speed of sound (0.034 cm/μs)",
      "Displays result on 128x64 OLED screen"
    ]
  },

  // ===== ADDITIONAL PROJECTS =====
  {
    id: "night-lamp",
    title: "Night Lamp",
    classLevel: "additional",
    difficulty: "easy",
    description: "A gentle night lamp that automatically turns on when the room gets dark and turns off in daylight. Perfect for bedrooms!",
    videoUrl: "https://www.youtube.com/watch?v=T2VASuZcfLY",
    whatYouLearn: ["LDR-based light sensing", "Analog threshold logic", "LED brightness control with PWM"],
    components: [
      { name: "Arduino UNO", description: "Controls lamp brightness", icon: "Cpu" },
      { name: "LDR Sensor", description: "Detects room brightness", icon: "Sun" },
      { name: "LED (Warm White)", description: "The night lamp", icon: "Lightbulb" },
      { name: "220Ω Resistor", description: "LED protection", icon: "Minus" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect LDR module VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect LDR module GND to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect LDR analog output to A0", pin: "A0", wireColor: "yellow" },
      { step: 4, instruction: "Connect LED (+) through resistor to pin 9 (PWM)", pin: "D9", wireColor: "green" },
      { step: 5, instruction: "Connect LED (-) to GND", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: [
      "A0 reads ambient light level (0-1023).",
      "Pin 9 uses PWM to smoothly adjust LED brightness.",
      "Darker room → brighter LED (mapped inversely)."
    ],
    code: `// Night Lamp - Auto brightness
// Additional Project - STEM Robotics Kit

int ldrPin = A0;
int ledPin = 9;    // PWM pin for brightness control

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Night Lamp Ready!");
}

void loop() {
  int lightLevel = analogRead(ldrPin);
  
  // Map light level to LED brightness (inverse)
  // Dark (high LDR value) = bright LED
  int brightness = map(lightLevel, 0, 1023, 0, 255);
  brightness = constrain(brightness, 0, 255);
  
  analogWrite(ledPin, brightness);
  
  Serial.print("Light: ");
  Serial.print(lightLevel);
  Serial.print(" → LED Brightness: ");
  Serial.println(brightness);
  
  delay(100);
}`,
    codeExplanation: [
      "map() converts LDR range to LED brightness range",
      "PWM on pin 9 allows smooth brightness control",
      "constrain() ensures values stay within valid range",
      "Darker environment automatically makes lamp brighter"
    ]
  },
  {
    id: "smart-fan",
    title: "Smart Fan",
    classLevel: "additional",
    difficulty: "easy",
    description: "A temperature-controlled fan that turns on automatically when temperature exceeds 30°C. Uses DHT22 sensor for accurate temperature and humidity readings.",
    videoUrl: "https://www.youtube.com/watch?v=kyz9NSA0oow",
    whatYouLearn: ["Temperature sensing with DHT22", "Relay control for high voltage devices", "Threshold-based automation"],
    components: [
      { name: "Arduino UNO", description: "Controls fan based on temp", icon: "Cpu" },
      { name: "DHT22 Sensor", description: "Reads temperature and humidity", icon: "Thermometer" },
      { name: "Relay Module", description: "Switches fan on/off", icon: "ToggleLeft" },
      { name: "DC Fan", description: "The cooling fan", icon: "Fan" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect DHT22 VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect DHT22 DATA to pin 4", pin: "D4", wireColor: "yellow" },
      { step: 3, instruction: "Connect DHT22 GND to GND", pin: "GND", wireColor: "black" },
      { step: 4, instruction: "Connect Relay IN to pin 7", pin: "D7", wireColor: "green" },
      { step: 5, instruction: "Connect Relay VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 6, instruction: "Connect Relay GND to GND", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: ["DHT22 reads temperature and humidity from pin 4.", "Relay module connected to pin 7 controls fan power.", "Fan turns ON when temperature > 30°C."],
    code: `#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

#define RELAY_PIN 7

DHT dht(DHTPIN, DHTTYPE);

float temperature;
float humidity;

void setup() {
  Serial.begin(9600);
  
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Fan OFF

  dht.begin();

  Serial.println("Smart Fan System Ready...");
}

void loop() {
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Sensor error!");
    return;
  }

  Serial.print("Temp: ");
  Serial.print(temperature);
  Serial.print(" °C | Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  // Logic: Turn ON fan if temp > 30°C
  if (temperature > 30) {
    digitalWrite(RELAY_PIN, HIGH); // Fan ON
    Serial.println("Fan ON");
  } else {
    digitalWrite(RELAY_PIN, LOW);  // Fan OFF
    Serial.println("Fan OFF");
  }

  delay(2000);
}`,
    codeExplanation: [
      "DHT22 library reads temperature and humidity",
      "Relay module controls fan power",
      "Fan turns on when temperature exceeds 30°C",
      "Reads temperature every 2 seconds"
    ]
  },
  {
    id: "gas-leakage-alarm",
    title: "Gas Leakage Alarm",
    classLevel: "additional",
    difficulty: "easy",
    description: "A safety device that detects LPG/gas leaks and sounds a loud alarm. Essential for kitchen safety!",
    videoUrl: "https://www.youtube.com/watch?v=oZfgQdH0xQo",
    whatYouLearn: ["Gas sensor operation", "Safety alarm systems", "Threshold-based alerts"],
    components: [
      { name: "Arduino UNO", description: "Brain", icon: "Cpu" },
      { name: "MQ-2 Gas Sensor", description: "Detects LPG, smoke", icon: "Wind" },
      { name: "Buzzer", description: "Alarm", icon: "Volume2" },
      { name: "Red LED", description: "Warning light", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect MQ-2 VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect MQ-2 GND to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect MQ-2 A0 to A0", pin: "A0", wireColor: "yellow" },
      { step: 4, instruction: "Connect Buzzer (+) to pin 8", pin: "D8", wireColor: "orange" },
      { step: 5, instruction: "Connect Red LED through resistor to pin 7", pin: "D7", wireColor: "green" },
      { step: 6, instruction: "Connect Buzzer (-) and LED (-) to GND", pin: "GND", wireColor: "black" }
    ],
    signalExplanation: ["A0 reads gas concentration.", "Pin 8 triggers buzzer alarm.", "Pin 7 turns on warning LED."],
    code: `// Gas Leakage Alarm
int gasPin = A0;
int buzzerPin = 8;
int ledPin = 7;

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Gas Alarm Ready! Warming up...");
  delay(3000);
}

void loop() {
  int gasLevel = analogRead(gasPin);
  Serial.print("Gas Level: "); Serial.println(gasLevel);
  
  if (gasLevel > 400) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 2500, 200);
    Serial.println("⚠️ GAS LEAK DETECTED!");
    delay(300);
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
  delay(200);
}`,
    codeExplanation: [
      "MQ-2 needs 3 second warmup",
      "Threshold at 400 for gas detection",
      "Buzzer beeps rapidly during leak"
    ]
  },
  {
    id: "smart-dustbin",
    title: "Smart Dustbin",
    classLevel: "additional",
    difficulty: "medium",
    description: "A hands-free dustbin that opens its lid automatically when you bring your hand close! Uses ultrasonic sensor and servo motor.",
    videoUrl: "https://www.youtube.com/watch?v=whoqckyTrw0",
    whatYouLearn: ["Proximity detection", "Servo motor control", "Hands-free automation"],
    components: [
      { name: "Arduino UNO", description: "Controls the dustbin", icon: "Cpu" },
      { name: "Ultrasonic Sensor", description: "Detects hand proximity", icon: "Radio" },
      { name: "Servo Motor", description: "Opens/closes lid", icon: "RotateCw" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Ultrasonic VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect Ultrasonic GND to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect TRIG to pin 3", pin: "D3", wireColor: "yellow" },
      { step: 4, instruction: "Connect ECHO to pin 4", pin: "D4", wireColor: "blue" },
      { step: 5, instruction: "Connect Servo signal to pin 9", pin: "D9", wireColor: "orange" },
      { step: 6, instruction: "Connect Servo VCC to 5V, GND to GND", pin: "5V", wireColor: "red" }
    ],
    signalExplanation: ["Ultrasonic detects hand within 15cm.", "Servo opens lid to 120°.", "Auto-closes after 3 seconds."],
    code: `// Smart Dustbin
#include <Servo.h>
Servo lidServo;
int trigPin = 3, echoPin = 4;

void setup() {
  lidServo.attach(9);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  lidServo.write(0);
  Serial.begin(9600);
  Serial.println("Smart Dustbin Ready!");
}

int getDistance() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

void loop() {
  int dist = getDistance();
  Serial.print("Distance: "); Serial.print(dist); Serial.println(" cm");
  
  if (dist < 15 && dist > 0) {
    Serial.println("🗑️ Opening lid...");
    lidServo.write(120);
    delay(3000);
    lidServo.write(0);
    Serial.println("Lid closed.");
  }
  delay(200);
}`,
    codeExplanation: [
      "Servo opens lid when hand detected within 15cm",
      "Lid stays open for 3 seconds",
      "Auto-closes using servo.write(0)"
    ]
  },
  {
    id: "smart-home-model",
    title: "Smart Home Model",
    classLevel: "additional",
    difficulty: "hard",
    description: "Build a complete smart home model with automatic lights, temperature-controlled fan, and security buzzer — all in one project!",
    videoUrl: "https://www.youtube.com/watch?v=QaumP_booa8",
    whatYouLearn: ["Multi-sensor integration", "Complex decision logic", "Smart home concepts"],
    components: [
      { name: "Arduino UNO", description: "Central controller", icon: "Cpu" },
      { name: "LDR Sensor", description: "Auto lights", icon: "Sun" },
      { name: "LM35 Temp Sensor", description: "Fan control", icon: "Thermometer" },
      { name: "PIR Sensor", description: "Motion-based security", icon: "Eye" },
      { name: "LED, Motor, Buzzer", description: "Outputs", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect LDR to A0 (with VCC to 5V, GND to GND)", pin: "A0", wireColor: "yellow" },
      { step: 2, instruction: "Connect LM35 output to A1", pin: "A1", wireColor: "orange" },
      { step: 3, instruction: "Connect PIR signal to pin 2", pin: "D2", wireColor: "blue" },
      { step: 4, instruction: "Connect LED through resistor to pin 9", pin: "D9", wireColor: "green" },
      { step: 5, instruction: "Connect motor through transistor to pin 10", pin: "D10", wireColor: "purple" },
      { step: 6, instruction: "Connect buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 7, instruction: "Connect all VCC to 5V and GND to GND", pin: "5V/GND", wireColor: "red" }
    ],
    signalExplanation: [
      "A0 controls lights based on ambient light.",
      "A1 controls fan based on temperature.",
      "Pin 2 detects intruders for security alarm."
    ],
    code: `// Smart Home Model
int ldrPin = A0, tempPin = A1, pirPin = 2;
int ledPin = 9, fanPin = 10, buzzerPin = 8;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(fanPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("🏠 Smart Home Ready!");
}

void loop() {
  // Auto Lights
  int light = analogRead(ldrPin);
  analogWrite(ledPin, map(light, 0, 1023, 255, 0));
  
  // Auto Fan
  float temp = (analogRead(tempPin) * 5.0 / 1024.0) * 100;
  int fanSpeed = temp > 25 ? map(temp, 25, 45, 80, 255) : 0;
  analogWrite(fanPin, constrain(fanSpeed, 0, 255));
  
  // Security
  if (digitalRead(pirPin) == HIGH) {
    tone(buzzerPin, 2000, 500);
    Serial.println("🚨 Motion detected!");
  }
  
  Serial.print("Light:"); Serial.print(light);
  Serial.print(" Temp:"); Serial.print(temp);
  Serial.println("°C");
  delay(500);
}`,
    codeExplanation: [
      "Three systems run simultaneously in the loop",
      "LDR inversely maps to LED brightness",
      "Temperature controls fan speed",
      "PIR triggers security buzzer"
    ]
  },
  {
    id: "smart-agriculture",
    title: "Smart Agriculture Model",
    classLevel: "additional",
    difficulty: "medium",
    description: "An automated plant watering system that monitors soil moisture and waters plants when they're dry!",
    videoUrl: "https://www.youtube.com/watch?v=DlnQUG_jI0o",
    whatYouLearn: ["Soil moisture sensing", "Relay/motor control", "Automated irrigation"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "Soil Moisture Sensor", description: "Checks if soil is dry", icon: "Droplets" },
      { name: "Water Pump / Motor", description: "Pumps water", icon: "Fan" },
      { name: "Transistor", description: "Motor driver", icon: "Zap" },
      { name: "LED (Green/Red)", description: "Status indicator", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect moisture sensor VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect moisture sensor GND to GND", pin: "GND", wireColor: "black" },
      { step: 3, instruction: "Connect moisture sensor analog to A0", pin: "A0", wireColor: "yellow" },
      { step: 4, instruction: "Connect pump motor through transistor to pin 9", pin: "D9", wireColor: "green" },
      { step: 5, instruction: "Connect Green LED to pin 6, Red LED to pin 7", pin: "D6/D7", wireColor: "green" }
    ],
    signalExplanation: [
      "A0 reads soil moisture (low = dry, high = wet).",
      "Pin 9 activates water pump when soil is dry.",
      "Green LED = moist, Red LED = needs water."
    ],
    code: `// Smart Agriculture - Auto Watering
int moisturePin = A0;
int pumpPin = 9;
int greenLed = 6, redLed = 7;

void setup() {
  pinMode(pumpPin, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  Serial.begin(9600);
  Serial.println("🌱 Smart Agriculture Ready!");
}

void loop() {
  int moisture = analogRead(moisturePin);
  Serial.print("Moisture: "); Serial.println(moisture);
  
  if (moisture < 400) {  // Dry soil
    digitalWrite(pumpPin, HIGH);
    digitalWrite(redLed, HIGH);
    digitalWrite(greenLed, LOW);
    Serial.println("💧 Watering plants...");
  } else {
    digitalWrite(pumpPin, LOW);
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    Serial.println("✅ Soil is moist");
  }
  delay(1000);
}`,
    codeExplanation: [
      "Moisture sensor reads soil water content",
      "Below 400 = dry, pump activates",
      "LEDs show watering status"
    ]
  },
  {
    id: "temperature-display-alarm",
    title: "Temperature Display Alarm",
    classLevel: "additional",
    difficulty: "medium",
    description: "Monitor room temperature and trigger an alarm when it gets too hot! Displays temperature on serial monitor.",
    videoUrl: "https://www.youtube.com/watch?v=iUczvH2pxj0",
    whatYouLearn: ["Temperature monitoring", "Alarm thresholds", "Serial data display"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "LM35 Sensor", description: "Temperature sensor", icon: "Thermometer" },
      { name: "Buzzer", description: "High-temp alarm", icon: "Volume2" },
      { name: "Red LED", description: "Warning light", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect LM35 VCC to 5V", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect LM35 OUT to A0", pin: "A0", wireColor: "yellow" },
      { step: 3, instruction: "Connect LM35 GND to GND", pin: "GND", wireColor: "black" },
      { step: 4, instruction: "Connect Buzzer (+) to pin 8", pin: "D8", wireColor: "orange" },
      { step: 5, instruction: "Connect Red LED through resistor to pin 7", pin: "D7", wireColor: "green" }
    ],
    signalExplanation: [
      "A0 reads temperature.",
      "Above 35°C triggers buzzer and LED alarm."
    ],
    code: `// Temperature Display Alarm
int tempPin = A0, buzzerPin = 8, ledPin = 7;

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("🌡️ Temp Monitor Ready!");
}

void loop() {
  float temp = (analogRead(tempPin) * 5.0 / 1024.0) * 100;
  Serial.print("Temperature: "); Serial.print(temp); Serial.println("°C");
  
  if (temp > 35) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 2000, 300);
    Serial.println("🔥 HIGH TEMP ALERT!");
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  }
  delay(1000);
}`,
    codeExplanation: [
      "LM35 outputs 10mV/°C",
      "Alert triggers above 35°C",
      "Buzzer and LED warn of overheating"
    ]
  },
  {
    id: "obstacle-alert",
    title: "Obstacle Alert",
    classLevel: "additional",
    difficulty: "easy",
    description: "A portable obstacle detector that buzzes when something is in the way. Great for visually impaired assistance!",
    videoUrl: "https://www.youtube.com/watch?v=HynLoCtUVtU",
    whatYouLearn: ["Ultrasonic proximity sensing", "Audio alerts", "Assistive technology basics"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "Ultrasonic Sensor", description: "Obstacle detection", icon: "Radio" },
      { name: "Buzzer", description: "Alert sound", icon: "Volume2" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Ultrasonic VCC to 5V, GND to GND", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect TRIG to pin 3", pin: "D3", wireColor: "yellow" },
      { step: 3, instruction: "Connect ECHO to pin 4", pin: "D4", wireColor: "blue" },
      { step: 4, instruction: "Connect Buzzer (+) to pin 8, (-) to GND", pin: "D8", wireColor: "orange" }
    ],
    signalExplanation: [
      "Ultrasonic measures distance to obstacle.",
      "Closer obstacle = faster beeping."
    ],
    code: `// Obstacle Alert
int trigPin = 3, echoPin = 4, buzzerPin = 8;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

int getDistance() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

void loop() {
  int dist = getDistance();
  if (dist < 30 && dist > 0) {
    int beepDelay = map(dist, 0, 30, 50, 500);
    tone(buzzerPin, 1500, 100);
    delay(beepDelay);
  }
  delay(100);
}`,
    codeExplanation: [
      "Distance mapped to beep frequency",
      "Closer = faster beeps",
      "Simple assistive device"
    ]
  },
  {
    id: "anti-theft-alarm",
    title: "Anti-Theft Alarm",
    classLevel: "additional",
    difficulty: "medium",
    description: "Protect your belongings with a motion-detecting anti-theft alarm using PIR sensor!",
    videoUrl: "https://www.youtube.com/watch?v=flGQ0-3g-kE",
    whatYouLearn: ["PIR motion detection", "Security system design", "Alert mechanisms"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "PIR Sensor", description: "Motion detection", icon: "Eye" },
      { name: "Buzzer", description: "Loud alarm", icon: "Volume2" },
      { name: "Red LED", description: "Warning", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect PIR VCC to 5V, GND to GND", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect PIR signal to pin 2", pin: "D2", wireColor: "yellow" },
      { step: 3, instruction: "Connect Buzzer (+) to pin 8", pin: "D8", wireColor: "orange" },
      { step: 4, instruction: "Connect Red LED through resistor to pin 7", pin: "D7", wireColor: "green" }
    ],
    signalExplanation: [
      "PIR sends HIGH when motion detected.",
      "Buzzer sounds for 5 seconds on detection.",
      "30-second warmup needed for PIR."
    ],
    code: `// Anti-Theft Alarm
int pirPin = 2, buzzerPin = 8, ledPin = 7;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("🔒 Anti-Theft Alarm - Warming up...");
  delay(30000);  // PIR warmup
  Serial.println("System ARMED!");
}

void loop() {
  if (digitalRead(pirPin) == HIGH) {
    Serial.println("🚨 INTRUDER DETECTED!");
    for (int i = 0; i < 10; i++) {
      digitalWrite(ledPin, HIGH);
      tone(buzzerPin, 3000, 200);
      delay(300);
      digitalWrite(ledPin, LOW);
      delay(200);
    }
  }
  delay(100);
}`,
    codeExplanation: [
      "PIR needs 30 second warmup",
      "Motion triggers 5-second alarm",
      "LED flashes with buzzer"
    ]
  },
  {
    id: "automatic-parking-gate",
    title: "Automatic Parking Gate",
    classLevel: "additional",
    difficulty: "medium",
    description: "Build a parking gate that opens when a car approaches and closes after it passes. Includes entry/exit indicators!",
    videoUrl: "https://www.youtube.com/watch?v=PFF4DTkMsaM",
    whatYouLearn: ["Proximity-based automation", "Servo control", "Traffic management basics"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "IR Sensor", description: "Car detection", icon: "Radio" },
      { name: "Servo Motor", description: "Gate mechanism", icon: "RotateCw" },
      { name: "LEDs (Red/Green)", description: "Traffic signals", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect IR sensor VCC to 5V, GND to GND", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect IR sensor OUT to pin 2", pin: "D2", wireColor: "yellow" },
      { step: 3, instruction: "Connect Servo signal to pin 9", pin: "D9", wireColor: "orange" },
      { step: 4, instruction: "Connect Green LED to pin 5, Red LED to pin 6", pin: "D5/D6", wireColor: "green" }
    ],
    signalExplanation: [
      "IR sensor detects car presence.",
      "Servo opens gate to 90°.",
      "Green = go, Red = wait."
    ],
    code: `// Automatic Parking Gate
#include <Servo.h>
Servo gate;
int irPin = 2, greenLed = 5, redLed = 6;

void setup() {
  gate.attach(9);
  pinMode(irPin, INPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  gate.write(0);
  digitalWrite(redLed, HIGH);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(irPin) == LOW) {  // Car detected
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    gate.write(90);  // Open
    Serial.println("🚗 Gate OPEN");
    delay(4000);
    gate.write(0);   // Close
    digitalWrite(greenLed, LOW);
    digitalWrite(redLed, HIGH);
    Serial.println("Gate CLOSED");
  }
  delay(200);
}`,
    codeExplanation: [
      "IR sensor detects car (LOW when object present)",
      "Gate opens and traffic light turns green",
      "Closes after 4 seconds"
    ]
  },
  {
    id: "weather-monitoring",
    title: "Weather Monitoring",
    classLevel: "additional",
    difficulty: "medium",
    description: "A mini weather station that monitors temperature and light conditions. Displays data via serial monitor.",
    videoUrl: "https://www.youtube.com/watch?v=-cwN8vbMIwg",
    whatYouLearn: ["Multi-sensor data collection", "Data formatting", "Weather station basics"],
    components: [
      { name: "Arduino UNO", description: "Data processor", icon: "Cpu" },
      { name: "LM35 Sensor", description: "Temperature", icon: "Thermometer" },
      { name: "LDR Sensor", description: "Light level", icon: "Sun" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect LM35 to A0 (VCC→5V, GND→GND)", pin: "A0", wireColor: "yellow" },
      { step: 2, instruction: "Connect LDR module to A1 (VCC→5V, GND→GND)", pin: "A1", wireColor: "orange" }
    ],
    signalExplanation: [
      "A0 reads temperature.",
      "A1 reads ambient light level."
    ],
    code: `// Weather Monitoring Station
int tempPin = A0, ldrPin = A1;

void setup() {
  Serial.begin(9600);
  Serial.println("🌤️ Weather Station Ready!");
}

void loop() {
  float temp = (analogRead(tempPin) * 5.0 / 1024.0) * 100;
  int light = analogRead(ldrPin);
  String condition = light > 700 ? "Sunny" : light > 400 ? "Cloudy" : "Dark";
  
  Serial.println("--- Weather Report ---");
  Serial.print("Temp: "); Serial.print(temp); Serial.println("°C");
  Serial.print("Light: "); Serial.print(light);
  Serial.print(" ("); Serial.print(condition); Serial.println(")");
  Serial.println("---------------------");
  delay(2000);
}`,
    codeExplanation: [
      "Two sensors read simultaneously",
      "Light level categorized into conditions",
      "Formatted weather report output"
    ]
  },
  {
    id: "smart-energy-saver",
    title: "Smart Energy Saver",
    classLevel: "additional",
    difficulty: "medium",
    description: "Automatically turns off lights and fans when no one is in the room! Saves energy using PIR motion detection.",
    videoUrl: "https://www.youtube.com/watch?v=mZWztJ9Sr5o",
    whatYouLearn: ["Energy conservation automation", "PIR timing logic", "Smart building concepts"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "PIR Sensor", description: "Room occupancy", icon: "Eye" },
      { name: "LED", description: "Room light", icon: "Lightbulb" },
      { name: "DC Motor", description: "Room fan", icon: "Fan" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect PIR to pin 2 (VCC→5V, GND→GND)", pin: "D2", wireColor: "yellow" },
      { step: 2, instruction: "Connect LED through resistor to pin 9", pin: "D9", wireColor: "green" },
      { step: 3, instruction: "Connect Motor through transistor to pin 10", pin: "D10", wireColor: "orange" }
    ],
    signalExplanation: [
      "PIR detects motion → room occupied.",
      "No motion for 10s → turn off light and fan.",
      "Saves energy automatically."
    ],
    code: `// Smart Energy Saver
int pirPin = 2, ledPin = 9, fanPin = 10;
unsigned long lastMotion = 0;
int timeout = 10000;  // 10 seconds

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(fanPin, OUTPUT);
  Serial.begin(9600);
  delay(30000);  // PIR warmup
  Serial.println("⚡ Energy Saver Active!");
}

void loop() {
  if (digitalRead(pirPin) == HIGH) {
    lastMotion = millis();
    digitalWrite(ledPin, HIGH);
    digitalWrite(fanPin, HIGH);
    Serial.println("Person detected - ON");
  }
  
  if (millis() - lastMotion > timeout) {
    digitalWrite(ledPin, LOW);
    digitalWrite(fanPin, LOW);
    Serial.println("No one here - OFF (saving energy!)");
  }
  delay(200);
}`,
    codeExplanation: [
      "millis() tracks time since last motion",
      "10-second timeout before shutoff",
      "Automatically saves energy"
    ]
  },
  {
    id: "gas-safety-countdown",
    title: "Gas Safety Countdown",
    classLevel: "additional",
    difficulty: "medium",
    description: "A gas detector with a countdown timer — if gas is detected, you have 10 seconds to ventilate before the alarm goes full blast!",
    videoUrl: "https://www.youtube.com/watch?v=eDs5Fdz4HWo",
    whatYouLearn: ["Countdown logic", "Progressive alerts", "Safety system design"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "MQ-2 Gas Sensor", description: "Gas detection", icon: "Wind" },
      { name: "Buzzer", description: "Progressive alarm", icon: "Volume2" },
      { name: "3x LEDs", description: "Countdown indicators", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect MQ-2 to A0 (VCC→5V, GND→GND)", pin: "A0", wireColor: "yellow" },
      { step: 2, instruction: "Connect Green LED to pin 5", pin: "D5", wireColor: "green" },
      { step: 3, instruction: "Connect Yellow LED to pin 6", pin: "D6", wireColor: "yellow" },
      { step: 4, instruction: "Connect Red LED to pin 7", pin: "D7", wireColor: "red" },
      { step: 5, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" }
    ],
    signalExplanation: [
      "Gas detected → countdown starts.",
      "Green→Yellow→Red LED progression.",
      "Full alarm if gas persists after countdown."
    ],
    code: `// Gas Safety Countdown
int gasPin = A0, buzzerPin = 8;
int leds[] = {5, 6, 7};  // Green, Yellow, Red

void setup() {
  for (int i = 0; i < 3; i++) pinMode(leds[i], OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
  delay(3000);
  Serial.println("Gas Safety System Ready!");
}

void loop() {
  int gas = analogRead(gasPin);
  
  if (gas > 400) {
    Serial.println("⚠️ Gas detected! Countdown starting...");
    // Stage 1: Warning (Green)
    digitalWrite(leds[0], HIGH);
    tone(buzzerPin, 500, 200);
    delay(3000);
    // Stage 2: Caution (Yellow)
    digitalWrite(leds[1], HIGH);
    tone(buzzerPin, 1000, 200);
    delay(3000);
    // Stage 3: Danger (Red)
    digitalWrite(leds[2], HIGH);
    
    if (analogRead(gasPin) > 400) {
      Serial.println("🚨 FULL ALARM!");
      for (int i = 0; i < 20; i++) {
        tone(buzzerPin, 3000, 200);
        delay(300);
      }
    }
    for (int i = 0; i < 3; i++) digitalWrite(leds[i], LOW);
  }
  delay(500);
}`,
    codeExplanation: [
      "3-stage countdown with escalating alerts",
      "Re-checks gas level before full alarm",
      "Gives time to ventilate"
    ]
  },
  {
    id: "touch-free-attendance",
    title: "Touch-Free Attendance",
    classLevel: "additional",
    difficulty: "medium",
    description: "A contactless attendance system — wave your hand near the sensor and it counts you! Shows total count on serial monitor.",
    videoUrl: "https://www.youtube.com/watch?v=khwQ4_nA5S4",
    whatYouLearn: ["IR proximity detection", "Counter logic", "Contactless systems"],
    components: [
      { name: "Arduino UNO", description: "Counter", icon: "Cpu" },
      { name: "IR Sensor", description: "Hand detection", icon: "Radio" },
      { name: "Buzzer", description: "Confirmation beep", icon: "Volume2" },
      { name: "LED", description: "Detection indicator", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect IR sensor VCC to 5V, GND to GND", pin: "5V", wireColor: "red" },
      { step: 2, instruction: "Connect IR OUT to pin 2", pin: "D2", wireColor: "yellow" },
      { step: 3, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 4, instruction: "Connect LED to pin 9", pin: "D9", wireColor: "green" }
    ],
    signalExplanation: [
      "IR detects hand wave.",
      "Counter increments per detection.",
      "Cooldown prevents double counting."
    ],
    code: `// Touch-Free Attendance
int irPin = 2, buzzerPin = 8, ledPin = 9;
int count = 0;
bool lastState = false;

void setup() {
  pinMode(irPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("📋 Attendance System Ready!");
}

void loop() {
  bool detected = digitalRead(irPin) == LOW;
  
  if (detected && !lastState) {
    count++;
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 1500, 100);
    Serial.print("✅ Count: "); Serial.println(count);
    delay(1000);  // Cooldown
    digitalWrite(ledPin, LOW);
  }
  lastState = detected;
  delay(50);
}`,
    codeExplanation: [
      "Edge detection prevents double counting",
      "1-second cooldown between entries",
      "Running count displayed on serial"
    ]
  },
  {
    id: "smart-air-quality",
    title: "Smart Air Quality Indicator",
    classLevel: "additional",
    difficulty: "medium",
    description: "Monitor air quality with color-coded LEDs! Green for clean air, yellow for moderate, red for poor — like a traffic light for breathing.",
    videoUrl: "https://www.youtube.com/watch?v=8AXeE44Zhe8",
    whatYouLearn: ["Air quality monitoring", "Multi-threshold indicators", "Environmental sensing"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "MQ-135 Sensor", description: "Air quality sensor", icon: "Wind" },
      { name: "3x LEDs (R/Y/G)", description: "Air quality indicators", icon: "Lightbulb" },
      { name: "Buzzer", description: "Poor air alert", icon: "Volume2" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect MQ-135 to A0 (VCC→5V, GND→GND)", pin: "A0", wireColor: "yellow" },
      { step: 2, instruction: "Connect Green LED to pin 5", pin: "D5", wireColor: "green" },
      { step: 3, instruction: "Connect Yellow LED to pin 6", pin: "D6", wireColor: "yellow" },
      { step: 4, instruction: "Connect Red LED to pin 7", pin: "D7", wireColor: "red" },
      { step: 5, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" }
    ],
    signalExplanation: [
      "MQ-135 reads air quality (lower = cleaner).",
      "<200: Good (green). 200-400: Moderate (yellow). >400: Poor (red + buzzer)."
    ],
    code: `// Smart Air Quality Indicator
int airPin = A0, buzzerPin = 8;
int greenLed = 5, yellowLed = 6, redLed = 7;

void setup() {
  pinMode(greenLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
  delay(3000);
  Serial.println("🌬️ Air Quality Monitor Ready!");
}

void loop() {
  int airQuality = analogRead(airPin);
  digitalWrite(greenLed, LOW);
  digitalWrite(yellowLed, LOW);
  digitalWrite(redLed, LOW);
  noTone(buzzerPin);
  
  if (airQuality < 200) {
    digitalWrite(greenLed, HIGH);
    Serial.println("🟢 Good air quality");
  } else if (airQuality < 400) {
    digitalWrite(yellowLed, HIGH);
    Serial.println("🟡 Moderate - ventilate");
  } else {
    digitalWrite(redLed, HIGH);
    tone(buzzerPin, 2000, 300);
    Serial.println("🔴 Poor air! Open windows!");
  }
  delay(1000);
}`,
    codeExplanation: [
      "Three zones for air quality",
      "Color-coded LED feedback",
      "Buzzer warns of poor air"
    ]
  },
  {
    id: "automatic-gate-counter",
    title: "Automatic Gate Counter",
    classLevel: "additional",
    difficulty: "medium",
    description: "Count people entering through a gate! Uses IR sensor to detect passage and keeps a running total.",
    videoUrl: "https://www.youtube.com/watch?v=khwQ4_nA5S4",
    whatYouLearn: ["Object counting", "IR beam-break detection", "Entry tracking systems"],
    components: [
      { name: "Arduino UNO", description: "Counter", icon: "Cpu" },
      { name: "IR Sensor", description: "Passage detection", icon: "Radio" },
      { name: "Buzzer", description: "Entry beep", icon: "Volume2" },
      { name: "LED", description: "Detection flash", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect IR sensor to pin 2 (VCC→5V, GND→GND)", pin: "D2", wireColor: "yellow" },
      { step: 2, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 3, instruction: "Connect LED to pin 9", pin: "D9", wireColor: "green" }
    ],
    signalExplanation: [
      "IR beam breaks when someone passes.",
      "Counter increments on each break.",
      "Debounce prevents double-counting."
    ],
    code: `// Automatic Gate Counter
int irPin = 2, buzzerPin = 8, ledPin = 9;
int count = 0;
bool lastState = HIGH;

void setup() {
  pinMode(irPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("🚶 Gate Counter Ready!");
}

void loop() {
  bool state = digitalRead(irPin);
  
  if (state == LOW && lastState == HIGH) {
    count++;
    tone(buzzerPin, 1200, 100);
    digitalWrite(ledPin, HIGH);
    Serial.print("Person #"); Serial.println(count);
    delay(500);
    digitalWrite(ledPin, LOW);
  }
  lastState = state;
  delay(50);
}`,
    codeExplanation: [
      "Edge detection on IR beam break",
      "500ms debounce",
      "Running count on serial monitor"
    ]
  },
  {
    id: "safety-helmet-alert",
    title: "Safety Helmet Alert",
    classLevel: "additional",
    difficulty: "easy",
    description: "A tilt sensor in a helmet that alerts when the helmet is removed or falls off. Safety first!",
    videoUrl: "https://www.youtube.com/watch?v=04fbUzudPno",
    whatYouLearn: ["Tilt detection for safety", "Wearable alert systems", "Construction safety tech"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "Tilt Sensor", description: "Helmet position", icon: "RotateCcw" },
      { name: "Buzzer", description: "Alert sound", icon: "Volume2" },
      { name: "LED", description: "Warning light", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect tilt sensor one pin to D2, other to GND", pin: "D2", wireColor: "yellow" },
      { step: 2, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 3, instruction: "Connect LED to pin 9", pin: "D9", wireColor: "green" }
    ],
    signalExplanation: [
      "Tilt sensor detects helmet removal.",
      "Buzzer sounds when helmet is off/tilted."
    ],
    code: `// Safety Helmet Alert
int tiltPin = 2, buzzerPin = 8, ledPin = 9;

void setup() {
  pinMode(tiltPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("⛑️ Helmet Alert Ready!");
}

void loop() {
  if (digitalRead(tiltPin) == LOW) {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 2500, 200);
    Serial.println("⚠️ Helmet removed/tilted!");
    delay(300);
  } else {
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
    Serial.println("✅ Helmet OK");
  }
  delay(200);
}`,
    codeExplanation: [
      "Tilt sensor uses internal pullup",
      "Alarm when helmet is removed/tilted",
      "Simple safety monitoring"
    ]
  },
  {
    id: "room-occupancy",
    title: "Room Occupancy Indicator",
    classLevel: "additional",
    difficulty: "easy",
    description: "Shows whether a room is occupied or vacant using an LED indicator outside the door. PIR sensor detects people inside.",
    videoUrl: "https://www.youtube.com/watch?v=giIMy18D2lY",
    whatYouLearn: ["Occupancy detection", "PIR sensor usage", "Room management"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "PIR Sensor", description: "Motion detection", icon: "Eye" },
      { name: "Green LED", description: "Vacant indicator", icon: "Lightbulb" },
      { name: "Red LED", description: "Occupied indicator", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect PIR to pin 2 (VCC→5V, GND→GND)", pin: "D2", wireColor: "yellow" },
      { step: 2, instruction: "Connect Green LED to pin 5", pin: "D5", wireColor: "green" },
      { step: 3, instruction: "Connect Red LED to pin 6", pin: "D6", wireColor: "red" }
    ],
    signalExplanation: [
      "PIR detects motion = occupied.",
      "No motion for 30s = vacant.",
      "Green = free, Red = occupied."
    ],
    code: `// Room Occupancy Indicator
int pirPin = 2, greenLed = 5, redLed = 6;
unsigned long lastMotion = 0;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  Serial.begin(9600);
  delay(30000);
  Serial.println("🚪 Room Indicator Ready!");
  digitalWrite(greenLed, HIGH);
}

void loop() {
  if (digitalRead(pirPin) == HIGH) {
    lastMotion = millis();
    digitalWrite(redLed, HIGH);
    digitalWrite(greenLed, LOW);
    Serial.println("🔴 Occupied");
  }
  
  if (millis() - lastMotion > 30000) {
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    Serial.println("🟢 Vacant");
  }
  delay(500);
}`,
    codeExplanation: [
      "PIR detects room occupancy",
      "30-second timeout for vacancy",
      "Red/Green LED outside door"
    ]
  },
  {
    id: "smart-bus-door",
    title: "Smart Bus Door Safety",
    classLevel: "additional",
    difficulty: "hard",
    description: "A bus door system that checks for obstacles before closing. Uses ultrasonic sensor to prevent door from closing on passengers!",
    videoUrl: "https://www.youtube.com/watch?v=ybhMIy9LWFg",
    whatYouLearn: ["Safety interlock systems", "Obstacle detection", "Public transport automation"],
    components: [
      { name: "Arduino UNO", description: "Controller", icon: "Cpu" },
      { name: "Ultrasonic Sensor", description: "Obstacle detection", icon: "Radio" },
      { name: "Servo Motor", description: "Door mechanism", icon: "RotateCw" },
      { name: "Buzzer", description: "Warning sound", icon: "Volume2" },
      { name: "LEDs (R/G)", description: "Status indicators", icon: "Lightbulb" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Ultrasonic to pins 3 (TRIG) and 4 (ECHO)", pin: "D3/D4", wireColor: "yellow" },
      { step: 2, instruction: "Connect Servo to pin 9", pin: "D9", wireColor: "orange" },
      { step: 3, instruction: "Connect Green LED to pin 5, Red to pin 6", pin: "D5/D6", wireColor: "green" },
      { step: 4, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 5, instruction: "Connect power (5V, GND) to all components", pin: "5V/GND", wireColor: "red" }
    ],
    signalExplanation: [
      "Ultrasonic checks doorway for people.",
      "Door won't close if obstacle within 30cm.",
      "Buzzer warns before closing."
    ],
    code: `// Smart Bus Door Safety
#include <Servo.h>
Servo door;
int trigPin = 3, echoPin = 4;
int greenLed = 5, redLed = 6, buzzerPin = 8;

int getDistance() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

void setup() {
  door.attach(9);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  door.write(90);  // Door open
  Serial.begin(9600);
  Serial.println("🚌 Bus Door System Ready!");
}

void loop() {
  int dist = getDistance();
  
  if (dist < 30 && dist > 0) {
    // Person in doorway - keep open!
    door.write(90);
    digitalWrite(redLed, HIGH);
    digitalWrite(greenLed, LOW);
    tone(buzzerPin, 1000, 200);
    Serial.println("⚠️ Person in doorway - door stays open");
  } else {
    // Clear - safe to close
    Serial.println("✅ Doorway clear - closing...");
    tone(buzzerPin, 500, 1000);
    delay(2000);  // Warning before close
    door.write(0);
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    delay(5000);  // Stay closed
    door.write(90);  // Reopen
  }
  delay(500);
}`,
    codeExplanation: [
      "Continuously checks doorway for people",
      "Door won't close with obstacle present",
      "2-second warning before closing",
      "Auto-cycles open/close"
    ]
  },
  {
    id: "smart-glasses-blind",
    title: "Smart Glasses for Blind",
    classLevel: "additional",
    difficulty: "hard",
    description: "Assistive smart glasses that vibrate/beep when obstacles are detected ahead. Uses ultrasonic sensor for navigation help.",
    videoUrl: "https://www.youtube.com/watch?v=OwkQ0s1CNec",
    whatYouLearn: ["Assistive technology design", "Wearable electronics", "Distance-based haptic feedback"],
    components: [
      { name: "Arduino UNO (Nano preferred)", description: "Compact controller", icon: "Cpu" },
      { name: "Ultrasonic Sensor", description: "Forward obstacle detection", icon: "Radio" },
      { name: "Buzzer", description: "Audio feedback", icon: "Volume2" },
      { name: "Vibration Motor", description: "Haptic feedback", icon: "Zap" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect Ultrasonic TRIG to pin 3, ECHO to pin 4", pin: "D3/D4", wireColor: "yellow" },
      { step: 2, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 3, instruction: "Connect Vibration motor through transistor to pin 9", pin: "D9", wireColor: "green" },
      { step: 4, instruction: "Connect VCC to 5V, GND to GND for all", pin: "5V/GND", wireColor: "red" }
    ],
    signalExplanation: [
      "Ultrasonic detects obstacles ahead.",
      "Closer = faster vibration and higher pitch beeps.",
      "Three zones: safe, caution, danger."
    ],
    code: `// Smart Glasses for Blind
int trigPin = 3, echoPin = 4;
int buzzerPin = 8, vibePin = 9;

int getDistance() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(vibePin, OUTPUT);
  Serial.begin(9600);
  Serial.println("👓 Smart Glasses Ready!");
}

void loop() {
  int dist = getDistance();
  
  if (dist < 30 && dist > 0) {
    int intensity = map(dist, 0, 30, 255, 50);
    int freq = map(dist, 0, 30, 3000, 500);
    int beepDelay = map(dist, 0, 30, 50, 500);
    
    analogWrite(vibePin, intensity);
    tone(buzzerPin, freq, 100);
    delay(beepDelay);
    analogWrite(vibePin, 0);
    delay(beepDelay);
  } else {
    analogWrite(vibePin, 0);
    noTone(buzzerPin);
  }
  delay(50);
}`,
    codeExplanation: [
      "Progressive feedback based on distance",
      "Vibration intensity increases near obstacles",
      "Audio pitch rises as obstacles get closer",
      "Designed for wearable mounting"
    ]
  },
  {
    id: "smart-cane-blind",
    title: "Smart Cane for Blind",
    classLevel: "additional",
    difficulty: "hard",
    description: "An enhanced walking cane with obstacle detection! Vibrates and beeps to warn of obstacles at different heights.",
    videoUrl: "https://www.youtube.com/watch?v=b1QhVhfgRds",
    whatYouLearn: ["Multi-level obstacle detection", "Haptic feedback design", "Accessibility engineering"],
    components: [
      { name: "Arduino UNO (Nano)", description: "Controller", icon: "Cpu" },
      { name: "2x Ultrasonic Sensors", description: "High and low obstacle detection", icon: "Radio" },
      { name: "Buzzer", description: "Audio alert", icon: "Volume2" },
      { name: "Vibration Motor", description: "Haptic alert", icon: "Zap" },
      { name: "Battery Pack", description: "Portable power", icon: "Battery" },
      { name: "Breadboard & Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Connect upper ultrasonic TRIG to pin 3, ECHO to pin 4", pin: "D3/D4", wireColor: "yellow" },
      { step: 2, instruction: "Connect lower ultrasonic TRIG to pin 5, ECHO to pin 6", pin: "D5/D6", wireColor: "blue" },
      { step: 3, instruction: "Connect Buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 4, instruction: "Connect Vibration motor to pin 9", pin: "D9", wireColor: "green" }
    ],
    signalExplanation: [
      "Upper sensor detects chest-level obstacles.",
      "Lower sensor detects ground-level obstacles.",
      "Different alert patterns for upper/lower."
    ],
    code: `// Smart Cane for Blind
int trig1 = 3, echo1 = 4;  // Upper sensor
int trig2 = 5, echo2 = 6;  // Lower sensor
int buzzerPin = 8, vibePin = 9;

int getDistance(int trig, int echo) {
  digitalWrite(trig, LOW); delayMicroseconds(2);
  digitalWrite(trig, HIGH); delayMicroseconds(10);
  digitalWrite(trig, LOW);
  return pulseIn(echo, HIGH) * 0.034 / 2;
}

void setup() {
  pinMode(trig1, OUTPUT); pinMode(echo1, INPUT);
  pinMode(trig2, OUTPUT); pinMode(echo2, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(vibePin, OUTPUT);
  Serial.begin(9600);
  Serial.println("🦯 Smart Cane Ready!");
}

void loop() {
  int upper = getDistance(trig1, echo1);
  int lower = getDistance(trig2, echo2);
  
  if (lower < 50 && lower > 0) {
    // Ground obstacle - short vibrations
    analogWrite(vibePin, 200);
    tone(buzzerPin, 1000, 100);
    Serial.println("⬇️ Ground obstacle!");
    delay(150);
    analogWrite(vibePin, 0);
    delay(150);
  } else if (upper < 50 && upper > 0) {
    // Upper obstacle - long vibrations
    analogWrite(vibePin, 255);
    tone(buzzerPin, 2000, 300);
    Serial.println("⬆️ Upper obstacle!");
    delay(400);
    analogWrite(vibePin, 0);
    delay(200);
  } else {
    analogWrite(vibePin, 0);
    noTone(buzzerPin);
  }
  delay(100);
}`,
    codeExplanation: [
      "Two ultrasonic sensors at different heights",
      "Different vibration patterns per level",
      "Ground obstacles: short rapid pulses",
      "Upper obstacles: longer sustained vibration"
    ]
  },
  {
    id: "smart-shoes-blind",
    title: "Smart Shoes for Blind",
    classLevel: "additional",
    difficulty: "hard",
    description: "Shoes with built-in obstacle detection! Ultrasonic sensors in the toe detect obstacles and vibration motors in the sole alert the wearer.",
    videoUrl: "https://www.youtube.com/watch?v=_RpSaj9j-GY",
    whatYouLearn: ["Wearable tech integration", "Foot-level obstacle detection", "Haptic shoe design"],
    components: [
      { name: "Arduino Nano", description: "Small controller for shoe", icon: "Cpu" },
      { name: "Ultrasonic Sensor", description: "Toe-mounted detector", icon: "Radio" },
      { name: "Vibration Motor", description: "Sole-mounted feedback", icon: "Zap" },
      { name: "Buzzer (small)", description: "Optional audio", icon: "Volume2" },
      { name: "Battery Pack", description: "Portable power", icon: "Battery" },
      { name: "Wires", description: "Connections", icon: "Cable" }
    ],
    connectionSteps: [
      { step: 1, instruction: "Mount ultrasonic sensor at shoe toe", pin: "D3/D4", wireColor: "yellow" },
      { step: 2, instruction: "Connect TRIG to pin 3, ECHO to pin 4", pin: "D3/D4", wireColor: "blue" },
      { step: 3, instruction: "Place vibration motor in shoe sole, connect to pin 9", pin: "D9", wireColor: "green" },
      { step: 4, instruction: "Connect small buzzer to pin 8", pin: "D8", wireColor: "orange" },
      { step: 5, instruction: "Connect battery pack to Arduino VIN and GND", pin: "VIN/GND", wireColor: "red" }
    ],
    signalExplanation: [
      "Toe sensor detects ground-level obstacles.",
      "Vibration in sole gives intuitive directional feedback.",
      "Stronger vibration = closer obstacle."
    ],
    code: `// Smart Shoes for Blind
int trigPin = 3, echoPin = 4;
int vibePin = 9, buzzerPin = 8;

int getDistance() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(vibePin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("👟 Smart Shoes Ready!");
}

void loop() {
  int dist = getDistance();
  
  if (dist > 0 && dist < 40) {
    int vibeStrength = map(dist, 0, 40, 255, 80);
    analogWrite(vibePin, vibeStrength);
    
    if (dist < 15) {
      tone(buzzerPin, 2500, 50);  // Close - high beep
    }
    
    int pauseTime = map(dist, 0, 40, 30, 300);
    delay(pauseTime);
    analogWrite(vibePin, 0);
    delay(pauseTime);
  } else {
    analogWrite(vibePin, 0);
    noTone(buzzerPin);
  }
  delay(50);
}`,
    codeExplanation: [
      "Toe-mounted sensor scans ahead",
      "Sole vibration gives walking feedback",
      "Audio only for very close obstacles (<15cm)",
      "Battery-powered for portability"
    ]
  }
];

export const getProjectsByClass = (classLevel: string) =>
  projects.filter((p) => p.classLevel === classLevel);

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);

export const classInfo = {
  "6": { label: "Class 6", color: "class6", icon: "BookOpen", projectCount: 3 },
  "7": { label: "Class 7", color: "class7", icon: "Rocket", projectCount: 3 },
  "8": { label: "Class 8", color: "class8", icon: "Cog", projectCount: 3 },
  additional: { label: "Additional", color: "additional", icon: "Star", projectCount: 23 },
};
