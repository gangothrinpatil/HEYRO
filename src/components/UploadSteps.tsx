const steps = [
  { title: "Connect Arduino", description: "Plug your Arduino board into your computer using a USB cable.", icon: "🔌" },
  { title: "Open Arduino IDE", description: "Launch the Arduino IDE software on your computer.", icon: "💻" },
  { title: "Select Board", description: "Go to Tools → Board → Arduino UNO (or your board type).", icon: "📋" },
  { title: "Select Port", description: "Go to Tools → Port and select the COM port your Arduino is on.", icon: "🔗" },
  { title: "Paste the Code", description: "Copy the code from the Code tab and paste it into the Arduino IDE editor.", icon: "📝" },
  { title: "Upload!", description: "Click the Upload button (→ arrow). Wait for 'Done uploading' message.", icon: "🚀" },
  { title: "Test It", description: "Your project should now be running! Test it with the components.", icon: "✅" },
];

export default function UploadSteps() {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl">
            {step.icon}
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">
              Step {i + 1}: {step.title}
            </h4>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
