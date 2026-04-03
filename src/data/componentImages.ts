// Maps component name keywords to their images
const componentKeywords: [string[], string][] = [
  [["arduino uno","arduino uno (nano"], "/components/arduino-uno.jpg"],
  [["arduino nano"], "/components/arduino-nano.jpg"],
  [["breadboard & wires","breadboard"], "/components/breadboard.jpg"],
  [["jumper wires"], "/components/jumper-wires.jpg"],
  [["ldr sensor","ldr"], "/components/ldr-sensor.jpg"],
  [["lm35","temperature sensor","temp sensor"], "/components/lm35-sensor.jpg"],
  [["mq-3","mq3"], "/components/mq3-gas-sensor.jpg"],
  [["mq-2","mq2"], "/components/mq2-gas-sensor.jpg"],
  [["mq-135","mq135","air quality sensor"], "/components/mq135-sensor.jpg"],
  [["ultrasonic sensor","hc-sr04"], "/components/ultrasonic-sensor.jpg"],
  [["servo motor","servo"], "/components/servo-motor.jpg"],
  [["dc motor","motor + fan","fan","room fan"], "/components/dc-motor-fan.jpg"],
  [["water pump"], "/components/water-pump.jpg"],
  [["pir sensor","pir","motion"], "/components/pir-sensor.jpg"],
  [["ir sensor","ir "], "/components/ir-sensor.jpg"],
  [["soil moisture"], "/components/soil-moisture-sensor.jpg"],
  [["tilt sensor"], "/components/tilt-sensor.jpg"],
  [["push button","button"], "/components/push-button.jpg"],
  [["buzzer"], "/components/buzzer.jpg"],
  [["transistor","npn"], "/components/transistor.jpg"],
  [["diode","1n4007"], "/components/diode.jpg"],
  [["resistor","220"], "/components/resistor.jpg"],
  [["vibration motor","vibration"], "/components/vibration-motor.jpg"],
  [["battery pack","battery"], "/components/battery-pack.jpg"],
  [["led","light"], "/components/led.jpg"],
  [["wires"], "/components/jumper-wires.jpg"],
];

export function getComponentImage(componentName: string): string | undefined {
  const name = componentName.toLowerCase();
  for (const [keywords, image] of componentKeywords) {
    for (const keyword of keywords) {
      if (name.includes(keyword)) {
        return image;
      }
    }
  }
  return undefined;
}
