export interface CompetitionIdea {
  title: string;
  description: string;
  level: "school" | "district" | "state" | "national";
  competitionNames: string[];
  enhancements: string[];
  presentationTips: string[];
}

const competitionData: Record<string, CompetitionIdea> = {
  "automatic-street-light": {
    title: "Smart City Street Lighting System",
    description: "Expand this into a full smart city model with multiple street lights, solar panel integration, and energy monitoring. Show how cities save electricity with automated lighting.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "Inspire Awards MANAK", "National Children's Science Congress", "ATL Tinkering Marathon"],
    enhancements: [
      "Add a solar panel to make it energy-independent",
      "Use multiple LEDs to simulate a street with several lights",
      "Add an LCD to display energy saved",
      "Include a manual override switch for emergencies",
      "Create a cardboard smart city model around it"
    ],
    presentationTips: [
      "Show real-world data on energy wasted by street lights left on during daytime",
      "Compare energy costs: manual vs automatic street lighting",
      "Explain the UN Sustainable Development Goal 7 (Affordable & Clean Energy)",
      "Create a poster showing the circuit diagram and working principle"
    ]
  },
  "alcohol-detector-buzzer": {
    title: "Drunk Driving Prevention System",
    description: "Build this into a vehicle safety system that detects alcohol on the driver's breath and prevents the car from starting. Add an LCD display and GPS-style alert.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "National Road Safety Competition", "ATL Tinkering Marathon"],
    enhancements: [
      "Add an LCD display showing alcohol level readings",
      "Include a relay to simulate engine lock/unlock",
      "Add a servo motor to block the ignition key slot",
      "Include LED indicators: Green (safe), Yellow (warning), Red (danger)",
      "Create a car dashboard model with the system integrated"
    ],
    presentationTips: [
      "Present road accident statistics caused by drunk driving in India",
      "Explain how MQ-3 sensors work at a molecular level",
      "Show a cost analysis — how cheap this solution is vs lives saved",
      "Demonstrate live with hand sanitizer (contains alcohol) for safe testing"
    ]
  },
  "tilt-alert-system": {
    title: "Earthquake/Landslide Early Warning System",
    description: "Convert this into a natural disaster warning system that detects ground tilt and sends alerts. Perfect for earthquake-prone and hilly areas.",
    level: "state",
    competitionNames: ["CBSE Science Exhibition", "Inspire Awards MANAK", "National Children's Science Congress", "IRIS National Science Fair"],
    enhancements: [
      "Use multiple tilt sensors at different angles for accuracy",
      "Add an LCD showing tilt angle measurements",
      "Include a loud siren for community alerts",
      "Add colored LEDs for severity levels (Green/Yellow/Red)",
      "Create a model of a hillside with houses to demonstrate"
    ],
    presentationTips: [
      "Reference recent earthquakes/landslides in India and their impact",
      "Explain how early warning systems save lives",
      "Show a comparison with expensive commercial earthquake sensors",
      "Discuss deployment in schools and rural areas"
    ]
  },
  "mini-timer": {
    title: "Smart Exam Timer & Productivity Tool",
    description: "Upgrade into a multi-purpose classroom timer with different modes for exams, presentations, and Pomodoro study technique. Add preset times and visual countdown.",
    level: "school",
    competitionNames: ["School Science Fair", "ATL Tinkering Lab Exhibition", "CBSE Innovation Challenge"],
    enhancements: [
      "Add buttons for preset times (5, 10, 15, 25, 45 minutes)",
      "Include an LCD countdown display",
      "Add different buzzer patterns for warning (1 min left) and finish",
      "Color-coded LED strip showing time remaining",
      "Add a Pomodoro mode (25 min work, 5 min break)"
    ],
    presentationTips: [
      "Explain the Pomodoro Technique and its benefits for students",
      "Show how this replaces expensive commercial classroom timers",
      "Demonstrate during a live mini-quiz in your presentation",
      "Compare your cost (~₹200) vs commercial timers (~₹2000+)"
    ]
  },
  "disco-robots": {
    title: "Interactive Light Art Installation",
    description: "Scale up into a programmable LED art display or dancing robot with synchronized music. Great for demonstrating programming patterns and creativity.",
    level: "school",
    competitionNames: ["School Science Fair", "ATL Tinkering Lab Exhibition", "Robocon Junior", "Tech Fest Competitions"],
    enhancements: [
      "Add a sound sensor to make LEDs react to music/claps",
      "Use RGB LEDs for millions of color combinations",
      "Add a potentiometer to control blink speed",
      "Create patterns: chase, fade, rainbow, random",
      "Build a robot body around it with moving parts"
    ],
    presentationTips: [
      "Demonstrate multiple LED patterns with a live music performance",
      "Explain binary and how computers control individual LEDs",
      "Show the concept of PWM (Pulse Width Modulation) for brightness",
      "Create an eye-catching robot costume for the presentation"
    ]
  },
  "automatic-door-gate": {
    title: "Touchless Smart Access System",
    description: "Develop into a full contactless entry system for hospitals, labs, or schools. Add person counting, sanitizer dispenser, and access logging.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "CBSE Science Exhibition", "ATL Tinkering Marathon", "Smart India Hackathon (Junior)"],
    enhancements: [
      "Add a person counter with LCD display",
      "Include automatic sanitizer dispensing (extra servo + tube)",
      "Add a temperature sensor to screen for fever",
      "Include Green/Red light entry indicators",
      "Log entry count for occupancy management"
    ],
    presentationTips: [
      "Reference COVID-19 and the need for touchless systems",
      "Show how this reduces infection spread in hospitals and schools",
      "Present a cost comparison with commercial automatic doors (₹50,000+)",
      "Demonstrate with a cardboard building model"
    ]
  },
  "automatic-smart-fan": {
    title: "Energy-Efficient Climate Control System",
    description: "Build a smart room climate system that adjusts fan speed based on temperature, displays readings, and tracks energy savings over time.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "Inspire Awards MANAK", "Energy Conservation Competition", "ATL Tinkering Marathon"],
    enhancements: [
      "Add LCD showing real-time temperature and fan speed",
      "Implement 3-speed control (low/medium/high) based on temperature ranges",
      "Add a humidity sensor (DHT11) for heat index calculation",
      "Include energy saving calculation display",
      "Create a model room with the system installed"
    ],
    presentationTips: [
      "Calculate annual electricity savings with smart vs manual fan control",
      "Show temperature vs fan speed graphs from your data",
      "Explain how this contributes to reducing carbon footprint",
      "Reference India's electricity consumption data for ceiling fans"
    ]
  },
  "parking-light-system": {
    title: "Smart Parking Guidance System",
    description: "Create a multi-slot smart parking lot with individual slot detection, availability display, and guided parking using distance indicators.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "Smart City Competition", "ATL Tinkering Marathon"],
    enhancements: [
      "Add multiple ultrasonic sensors for several parking slots",
      "LCD/LED matrix showing available spots count",
      "Include entry/exit gates with servo motors",
      "Add a buzzer for collision warning",
      "Build a multi-level parking model with cardboard"
    ],
    presentationTips: [
      "Present statistics on time wasted finding parking in Indian cities",
      "Show how your system reduces fuel waste from circling for parking",
      "Compare with commercial parking systems (₹5-10 lakhs)",
      "Demonstrate with toy cars in your parking model"
    ]
  },
  "smart-scale": {
    title: "Contactless Height & Distance Measurement Tool",
    description: "Develop into a multipurpose measurement tool for construction, health checkups (height measurement), or warehouse inventory management.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "Inspire Awards MANAK", "ATL Tinkering Lab Exhibition"],
    enhancements: [
      "Add a height measurement mode for school health checkups",
      "Include data logging to track multiple measurements",
      "Add a laser pointer for precise aiming",
      "Include unit conversion (cm/inches/feet) with button toggle",
      "Add Bluetooth module for sending data to phone"
    ],
    presentationTips: [
      "Compare accuracy with a commercial measuring tape",
      "Show use cases: construction, health, sports",
      "Explain the physics of ultrasonic waves and speed of sound",
      "Demonstrate measuring various objects live"
    ]
  },
  "night-lamp": {
    title: "Adaptive Bedroom Night Light",
    description: "Create a smart bedroom light that adjusts brightness based on ambient light, includes a sleep timer, and has calming color modes for better sleep.",
    level: "school",
    competitionNames: ["School Science Fair", "ATL Tinkering Lab Exhibition"],
    enhancements: [
      "Use RGB LED for warm/cool light modes",
      "Add a sleep timer with gradual dimming",
      "Include a motion sensor for bathroom night light",
      "Add brightness adjustment with potentiometer"
    ],
    presentationTips: [
      "Discuss how blue light affects sleep quality",
      "Show energy savings compared to leaving lights on all night",
      "Present as a product for children afraid of the dark"
    ]
  },
  "smart-fan": {
    title: "Personal Climate Controller",
    description: "Build a desk fan system that automatically adjusts speed based on room temperature and user proximity, saving energy when no one is nearby.",
    level: "school",
    competitionNames: ["School Science Fair", "Energy Conservation Competition", "ATL Tinkering Lab Exhibition"],
    enhancements: [
      "Add proximity detection to turn off when no one is near",
      "Include speed control with PWM",
      "Add temperature display on LCD",
      "Include a timer for auto-off"
    ],
    presentationTips: [
      "Calculate energy saved by auto-off feature",
      "Demonstrate with a thermometer showing temperature response",
      "Compare electricity bill with and without smart control"
    ]
  },
  "gas-leakage-alarm": {
    title: "Home Gas Safety & Auto-Ventilation System",
    description: "Expand into a complete kitchen safety system with auto-ventilation (exhaust fan), gas valve shutoff simulation, and SMS-style alerts.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "CBSE Science Exhibition", "National Children's Science Congress"],
    enhancements: [
      "Add auto exhaust fan activation via relay",
      "Include gas valve shutoff simulation with servo",
      "Add SMS/call alert simulation with GSM module",
      "LCD showing gas level readings and status",
      "Create a kitchen model demonstrating the full system"
    ],
    presentationTips: [
      "Present LPG accident statistics in India (500+ deaths/year)",
      "Show how early detection saves lives and property",
      "Demonstrate with a lighter or incense stick (safe gas source)",
      "Explain the chemistry of how MQ-2 sensors detect gas"
    ]
  },
  "smart-dustbin": {
    title: "Contactless Smart Waste Management",
    description: "Build a touchless, self-sorting waste bin with fill-level detection. Great for promoting hygiene and smart waste management in schools.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "Swachh Bharat Competition", "ATL Tinkering Marathon"],
    enhancements: [
      "Add fill-level detection with second ultrasonic sensor",
      "Include LCD showing bin fullness percentage",
      "Add separate compartments for wet/dry waste",
      "LED indicator when bin is nearly full",
      "Add a 'thank you' message display for users"
    ],
    presentationTips: [
      "Reference Swachh Bharat Mission and its goals",
      "Show how touchless bins reduce disease spread",
      "Present waste management data for your school/area",
      "Demonstrate with a decorated bin model"
    ]
  },
  "smart-home-model": {
    title: "Complete IoT Smart Home",
    description: "Build a comprehensive smart home model with automated lighting, temperature-controlled fans, security system, and smart garden irrigation.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "CBSE Science Exhibition", "ATL Tinkering Marathon", "Smart India Hackathon (Junior)"],
    enhancements: [
      "Add a garage door with ultrasonic sensor",
      "Include a rain sensor for automatic window closing",
      "Add solar panel for energy independence",
      "Include a security camera simulation",
      "Build a detailed architectural model house"
    ],
    presentationTips: [
      "Present the global smart home market size and growth",
      "Show monthly electricity savings calculations",
      "Demonstrate each automated feature one by one",
      "Explain IoT concepts in simple language"
    ]
  },
  "smart-agriculture": {
    title: "Precision Agriculture & Water Conservation",
    description: "Develop into an automated farm management system with soil moisture monitoring, weather-based irrigation, and crop health tracking.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "National Children's Science Congress", "Krishi Vigyan Competition"],
    enhancements: [
      "Add multiple soil moisture sensors for different crop zones",
      "Include weather monitoring (temperature + humidity)",
      "Add LCD dashboard showing all sensor readings",
      "Include water flow measurement to track consumption",
      "Create a miniature farm model with real plants"
    ],
    presentationTips: [
      "Present water scarcity data in Indian agriculture",
      "Show how precision irrigation saves 30-50% water",
      "Reference farmer suicide crisis and how technology helps",
      "Grow actual plants with and without the system as comparison"
    ]
  },
  "temperature-display-alarm": {
    title: "Industrial Temperature Monitoring System",
    description: "Build a temperature monitoring station for server rooms, cold storage, or medical vaccine storage with alarm thresholds and data logging.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "Inspire Awards MANAK", "ATL Tinkering Lab Exhibition"],
    enhancements: [
      "Add min/max temperature memory and display",
      "Include multiple sensors for different locations",
      "Add data logging to SD card",
      "Include email/SMS alert simulation",
      "Create a cold storage model"
    ],
    presentationTips: [
      "Explain why vaccine cold chain monitoring is critical",
      "Show how server room overheating causes data center failures",
      "Present cost comparison with commercial monitoring systems",
      "Demonstrate with ice and hot water for live testing"
    ]
  },
  "obstacle-alert": {
    title: "Navigation Aid for Visually Impaired",
    description: "Develop into a wearable obstacle detection belt or hat that helps visually impaired people navigate safely with vibration and audio feedback.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "National Children's Science Congress", "IRIS National Science Fair"],
    enhancements: [
      "Add multiple ultrasonic sensors for 180° coverage",
      "Include vibration motors for haptic feedback",
      "Add voice alerts using a speaker module",
      "Make it wearable (belt, hat, or chest mount)",
      "Add step detection and fall alert"
    ],
    presentationTips: [
      "Present statistics on visually impaired people in India (12 million+)",
      "Invite a visually impaired person to test and give feedback",
      "Compare with commercial devices (₹50,000+ vs your ₹500 solution)",
      "Demonstrate with blindfolded navigation test"
    ]
  },
  "anti-theft-alarm": {
    title: "Smart Home Security System",
    description: "Build a multi-zone security system with motion detection, door/window sensors, and alarm with entry delay and code-based disarming.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "Inspire Awards MANAK", "ATL Tinkering Marathon"],
    enhancements: [
      "Add multiple PIR sensors for different rooms/zones",
      "Include door/window magnetic reed switches",
      "Add keypad for arm/disarm with passcode",
      "Include a flashing light with siren",
      "Create a house model with multiple entry points"
    ],
    presentationTips: [
      "Present burglary statistics and peak times",
      "Show cost comparison with commercial alarm systems",
      "Demonstrate entry detection from different zones",
      "Explain how PIR sensors detect heat/motion"
    ]
  },
  "automatic-parking-gate": {
    title: "Smart Toll/Parking Gate System",
    description: "Create an automated toll booth or parking gate with vehicle detection, barrier control, and ticket/counter system.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "ATL Tinkering Lab Exhibition", "Smart City Competition"],
    enhancements: [
      "Add vehicle counting with LCD display",
      "Include entry and exit gates",
      "Add LED traffic lights at the gate",
      "Include parking slot availability indicator",
      "Build a complete parking lot model"
    ],
    presentationTips: [
      "Show time saved with automated vs manual toll collection",
      "Reference FASTag and how automated systems work",
      "Demonstrate with toy cars",
      "Present revenue tracking capabilities"
    ]
  },
  "weather-monitoring": {
    title: "Micro Weather Station Network",
    description: "Build a weather station that monitors temperature, humidity, and displays data with trend indicators. Deploy in school for daily weather reports.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "Inspire Awards MANAK", "National Children's Science Congress"],
    enhancements: [
      "Add rain sensor for precipitation detection",
      "Include wind speed measurement with anemometer",
      "Add data logging for weather history",
      "Include weather prediction based on trends",
      "Create a weather dashboard display"
    ],
    presentationTips: [
      "Compare your readings with official weather data",
      "Show a week's worth of collected data as graphs",
      "Explain how weather stations help farmers",
      "Discuss climate change monitoring at local level"
    ]
  },
  "smart-energy-saver": {
    title: "Building Energy Management System",
    description: "Create an energy-saving system for classrooms/offices that automatically controls lights and fans based on occupancy, saving electricity.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "Energy Conservation Competition", "ATL Tinkering Marathon"],
    enhancements: [
      "Add daylight sensing for light dimming",
      "Include occupancy counting for HVAC optimization",
      "Add energy consumption display and logging",
      "Include scheduled on/off for different periods",
      "Create a classroom model with the system"
    ],
    presentationTips: [
      "Calculate annual energy savings for a school with 50 rooms",
      "Present electricity bill comparison data",
      "Show ROI (Return on Investment) calculation",
      "Explain India's energy conservation policies"
    ]
  },
  "gas-safety-countdown": {
    title: "Kitchen Safety Timer & Gas Monitor",
    description: "Combine gas monitoring with a cooking timer that alerts when gas is left on too long, preventing accidents from forgotten stoves.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "National Children's Science Congress"],
    enhancements: [
      "Add multiple preset cooking times for different dishes",
      "Include auto gas valve shutoff simulation",
      "Add voice alerts for elderly users",
      "Include a recipe timer database",
      "Create a kitchen safety dashboard"
    ],
    presentationTips: [
      "Present kitchen fire statistics in India",
      "Show how the elderly are most affected by gas accidents",
      "Demonstrate the countdown with different scenarios",
      "Explain how this could be integrated into smart kitchens"
    ]
  },
  "touch-free-attendance": {
    title: "Contactless Attendance & Health Screening",
    description: "Build a touchless attendance system with temperature screening for schools and offices, promoting hygiene and health monitoring.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "ATL Tinkering Marathon", "Smart India Hackathon (Junior)"],
    enhancements: [
      "Add temperature screening with MLX90614 sensor",
      "Include person counting with entry/exit tracking",
      "Add time display for attendance timestamp",
      "Include sanitizer dispenser integration",
      "Create a school entrance model"
    ],
    presentationTips: [
      "Show how post-COVID attendance needs have changed",
      "Present hygiene benefits of touchless systems",
      "Compare with biometric systems and their limitations",
      "Demonstrate a full entry sequence live"
    ]
  },
  "smart-air-quality": {
    title: "Urban Air Pollution Monitor & Alert",
    description: "Create an air quality monitoring station that measures pollution levels and provides real-time alerts, deployable in schools, homes, and public places.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "National Children's Science Congress", "CBSE Science Exhibition"],
    enhancements: [
      "Add multiple gas sensors for different pollutants",
      "Include PM2.5 dust sensor for particulate matter",
      "Add LCD dashboard with AQI calculation",
      "Include data logging for pollution trends",
      "Add location-based deployment capabilities"
    ],
    presentationTips: [
      "Present AQI data for your city vs safe limits",
      "Show health effects of air pollution on children",
      "Compare your readings with government AQI stations",
      "Explain the link between air quality and respiratory diseases"
    ]
  },
  "automatic-gate-counter": {
    title: "Smart Venue Crowd Management",
    description: "Build a people counting system for events, malls, or classrooms with occupancy limits and alerts when capacity is reached.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "ATL Tinkering Lab Exhibition", "Smart City Competition"],
    enhancements: [
      "Add maximum capacity setting with alert",
      "Include bi-directional counting (in/out)",
      "Add time-based analytics (peak hours)",
      "Include wireless display for entrance/exit",
      "Build a venue model with gates"
    ],
    presentationTips: [
      "Reference crowd management failures (stampedes) and prevention",
      "Show how this helps during COVID capacity restrictions",
      "Present data from a school hallway test",
      "Demonstrate with people walking through your model"
    ]
  },
  "safety-helmet-alert": {
    title: "Construction Worker Safety System",
    description: "Build a smart helmet that detects proper wearing and alerts supervisors, reducing head injuries at construction sites.",
    level: "state",
    competitionNames: ["Inspire Awards MANAK", "CBSE Science Exhibition", "National Children's Science Congress", "Industrial Safety Competition"],
    enhancements: [
      "Add impact/fall detection with accelerometer",
      "Include SOS button for emergencies",
      "Add GPS-style tracking simulation",
      "Include heat stroke detection with temperature sensor",
      "Mount everything inside an actual helmet"
    ],
    presentationTips: [
      "Present construction accident statistics in India",
      "Show how helmet compliance reduces head injuries by 85%",
      "Demonstrate with an actual helmet prototype",
      "Explain workplace safety laws and regulations"
    ]
  },
  "room-occupancy": {
    title: "Smart Building Occupancy System",
    description: "Create a room monitoring system for offices, libraries, and meeting rooms that shows real-time availability and controls lights/AC automatically.",
    level: "district",
    competitionNames: ["CBSE Science Exhibition", "ATL Tinkering Lab Exhibition", "Smart City Competition"],
    enhancements: [
      "Add door display showing room status (Occupied/Vacant)",
      "Include auto light and AC control",
      "Add booking/reservation simulation",
      "Include energy saving calculations",
      "Create a multi-room office model"
    ],
    presentationTips: [
      "Calculate energy wasted in empty occupied rooms",
      "Show how this helps in co-working spaces",
      "Present efficiency gains for meeting room management",
      "Demonstrate with a model showing multiple rooms"
    ]
  },
  "smart-bus-door": {
    title: "Passenger Safety Bus Door System",
    description: "Build an intelligent bus door that prevents closing while passengers are entering/exiting, reducing accidents at bus stops.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "National Road Safety Competition", "CBSE Science Exhibition"],
    enhancements: [
      "Add passenger counting for bus capacity",
      "Include speed detection — door locks while moving",
      "Add audio announcements for stops",
      "Include emergency door release",
      "Build a bus model with working doors"
    ],
    presentationTips: [
      "Present bus accident statistics at stops in India",
      "Show videos/news of door-related bus accidents",
      "Demonstrate with a bus model and toy passengers",
      "Compare with safety systems in metro trains"
    ]
  },
  "smart-glasses-blind": {
    title: "AI-Assisted Navigation Glasses",
    description: "Develop smart glasses with multi-directional obstacle detection and haptic/audio feedback for visually impaired navigation.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "CBSE Science Exhibition", "Google Science Fair", "ATL Tinkering Marathon"],
    enhancements: [
      "Add multiple sensors for left/right/center detection",
      "Include bone conduction speaker for audio alerts",
      "Add step-down detection for stairs/curbs",
      "Include light sensor for indoor/outdoor adaptation",
      "Design comfortable wearable frame"
    ],
    presentationTips: [
      "Present WHO data on visual impairment globally",
      "Invite a visually impaired person for live testing feedback",
      "Compare with commercial solutions ($500+ vs your $20)",
      "Explain social impact and accessibility rights"
    ]
  },
  "smart-cane-blind": {
    title: "Intelligent Walking Cane System",
    description: "Upgrade the traditional white cane with electronics for better obstacle detection range, puddle detection, and GPS-assisted navigation.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "National Children's Science Congress", "CBSE Science Exhibition"],
    enhancements: [
      "Add water/puddle detection sensor at the bottom",
      "Include multiple ultrasonic sensors at different heights",
      "Add GPS module for location tracking",
      "Include SOS button for emergency help",
      "Design ergonomic handle with all electronics"
    ],
    presentationTips: [
      "Show limitations of traditional white canes",
      "Present user feedback from visually impaired testers",
      "Demonstrate detection at various heights (ground, waist, head)",
      "Calculate the social impact if deployed nationally"
    ]
  },
  "smart-shoes-blind": {
    title: "Smart Footwear Navigation Aid",
    description: "Create intelligent shoes that detect ground-level obstacles, potholes, and uneven surfaces, providing vibration alerts through the soles.",
    level: "national",
    competitionNames: ["Inspire Awards MANAK", "IRIS National Science Fair", "Google Science Fair", "CBSE Science Exhibition", "ATL Tinkering Marathon"],
    enhancements: [
      "Add pressure sensors for step detection",
      "Include ground texture detection for surface changes",
      "Add puddle/water detection",
      "Include step counting and distance tracking",
      "Design waterproof housing for all-weather use"
    ],
    presentationTips: [
      "Present statistics on fall injuries among visually impaired",
      "Show how ground-level detection complements glasses and cane",
      "Demonstrate detecting potholes, steps, and obstacles",
      "Present as part of a complete assistive technology ecosystem"
    ]
  }
};

export function getCompetitionIdea(projectId: string): CompetitionIdea | undefined {
  return competitionData[projectId];
}

export const allCompetitions = [
  { name: "Inspire Awards MANAK", org: "DST, Govt of India", level: "national", url: "https://www.inspireawards-dst.gov.in" },
  { name: "CBSE Science Exhibition", org: "CBSE", level: "national", url: "" },
  { name: "IRIS National Science Fair", org: "IRIS", level: "national", url: "" },
  { name: "National Children's Science Congress", org: "NCSTC", level: "national", url: "" },
  { name: "ATL Tinkering Marathon", org: "Atal Innovation Mission", level: "national", url: "" },
  { name: "Smart India Hackathon (Junior)", org: "MHRD", level: "national", url: "" },
  { name: "Google Science Fair", org: "Google", level: "national", url: "" },
];
