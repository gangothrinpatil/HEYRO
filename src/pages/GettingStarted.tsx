import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    title: "What is Arduino?",
    content:
      "Arduino is a small computer board that you can program to control lights, motors, sensors and more. It's like a brain for your inventions! You write code on your computer, upload it to the Arduino, and it runs your instructions.",
  },
  {
    title: "What's in Your Kit?",
    content:
      "Your STEM Robotics kit includes an Arduino UNO board, a USB cable, a breadboard, LEDs, resistors, sensors (LDR, ultrasonic, temperature, gas, tilt, alcohol), a servo motor, a buzzer, an LCD display, and lots of jumper wires!",
  },
  {
    title: "Install Arduino IDE",
    steps: [
      "Go to arduino.cc/en/software on your browser",
      "Download the Arduino IDE for your computer (Windows, Mac, or Linux)",
      "Install it like any other program — follow the installer steps",
      "Open Arduino IDE — you'll see a blank code editor",
    ],
  },
  {
    title: "Connect Your Arduino",
    steps: [
      "Take the USB cable from your kit",
      "Plug the square end into the Arduino board",
      "Plug the flat USB end into your computer",
      "You should see a green LED light up on the Arduino — that means it has power!",
    ],
  },
  {
    title: "Configure the IDE",
    steps: [
      "In Arduino IDE, go to Tools → Board → Arduino AVR Boards → Arduino UNO",
      "Go to Tools → Port and select the port that shows your Arduino (usually COM3 or similar)",
      "If you don't see a port, try a different USB cable or restart the IDE",
    ],
  },
  {
    title: "Your First Upload — Blink!",
    steps: [
      "Go to File → Examples → 01.Basics → Blink",
      "This opens a simple program that blinks the built-in LED",
      "Click the Upload button (→ arrow icon) at the top",
      "Wait for 'Done uploading' at the bottom",
      "Look at your Arduino — the small LED should be blinking!",
    ],
  },
];

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Getting Started
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            New to Arduino? Follow these steps and you'll be building projects in no time.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="rounded-lg border border-border/50 p-6">
              <h2 className="flex items-center gap-3 font-display text-base font-bold tracking-tight text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-[10px] font-bold text-background">
                  {i + 1}
                </span>
                {section.title}
              </h2>
              {section.content && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.content}</p>
              )}
              {section.steps && (
                <ol className="mt-4 space-y-2 border-l border-border/50 pl-4">
                  {section.steps.map((step, j) => (
                    <li key={j} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="font-mono text-xs text-primary">{String(j + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-primary/20 bg-primary/[0.03] p-6 text-center">
          <h3 className="font-display text-base font-bold tracking-tight text-foreground">Ready to Build?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Pick your first project and start building.</p>
          <Button asChild size="lg" className="mt-4 gap-2 rounded-lg">
            <Link to="/projects">
              Browse Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
