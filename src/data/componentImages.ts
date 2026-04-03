// Maps component name keywords to their images
const imageModules = import.meta.glob<{ default: string }>('../assets/ASSETS/*.jpg', { eager: true });

const componentKeywords: [string[], string][] = [
  [["arduino uno","arduino uno (nano"], "arduino-uno"],
  [["arduino nano"], "arduino-nano"],
  [["breadboard & wires","breadboard"], "breadboard"],
  [["jumper wires"], "jumper-wires"],
  [["ldr sensor","ldr"], "ldr-sensor"],
  [["lm35","temperature sensor","temp sensor"], "lm35-sensor"],
  [["mq-3","mq3"], "mq3-gas-sensor"],
  [["mq-2","mq2"], "mq2-gas-sensor"],
  [["mq-135","mq135","air quality sensor"], "mq135-sensor"],
  [["ultrasonic sensor","hc-sr04"], "ultrasonic-sensor"],
  [["servo motor","servo"], "servo-motor"],
  [["dc motor","motor + fan","fan","room fan"], "dc-motor-fan"],
  [["water pump"], "water-pump"],
  [["pir sensor","pir","motion"], "pir-sensor"],
  [["ir sensor","ir "], "ir-sensor"],
  [["soil moisture"], "soil-moisture-sensor"],
  [["tilt sensor"], "tilt-sensor"],
  [["push button","button"], "push-button"],
  [["buzzer"], "buzzer"],
  [["transistor","npn"], "transistor"],
  [["diode","1n4007"], "diode"],
  [["resistor","220"], "resistor"],
  [["vibration motor","vibration"], "vibration-motor"],
  [["battery pack","battery"], "battery-pack"],
  [["led","light"], "led"],
  [["wires"], "jumper-wires"],
];

export function getComponentImage(componentName: string): string | undefined {
  const name = componentName.toLowerCase();
  for (const [keywords, imageKey] of componentKeywords) {
    for (const keyword of keywords) {
      if (name.includes(keyword)) {
        const pathKey = Object.keys(imageModules).find(p => p.endsWith(`${imageKey}.jpg`));
        return pathKey ? imageModules[pathKey].default : undefined;
      }
    }
  }
  return undefined;
}
