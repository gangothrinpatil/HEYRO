export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (completedIds: string[]) => boolean;
}

export const badges: Badge[] = [
  {
    id: "first-project",
    title: "First Steps",
    description: "Complete your very first project!",
    icon: "🚀",
    condition: (ids) => ids.length >= 1,
  },
  {
    id: "class6-master",
    title: "Class 6 Master",
    description: "Complete all Class 6 projects",
    icon: "🎓",
    condition: (ids) => ["automatic-street-light", "alcohol-detector-buzzer", "tilt-alert-system"].every((p) => ids.includes(p)),
  },
  {
    id: "class7-master",
    title: "Class 7 Master",
    description: "Complete all Class 7 projects",
    icon: "⚡",
    condition: (ids) => ["mini-timer", "disco-robots", "automatic-door-gate"].every((p) => ids.includes(p)),
  },
  {
    id: "class8-master",
    title: "Class 8 Master",
    description: "Complete all Class 8 projects",
    icon: "🏆",
    condition: (ids) => ["automatic-smart-fan", "parking-light-system", "smart-scale"].every((p) => ids.includes(p)),
  },
  {
    id: "five-done",
    title: "High Five!",
    description: "Complete 5 projects",
    icon: "🖐️",
    condition: (ids) => ids.length >= 5,
  },
  {
    id: "ten-done",
    title: "Perfect 10",
    description: "Complete 10 projects",
    icon: "🔟",
    condition: (ids) => ids.length >= 10,
  },
  {
    id: "sensor-expert",
    title: "Sensor Expert",
    description: "Complete 3 projects using ultrasonic sensors",
    icon: "📡",
    condition: (ids) => {
      const ultrasonicProjects = ["automatic-door-gate", "parking-light-system", "smart-scale", "smart-dustbin", "obstacle-alert", "smart-bus-door", "smart-glasses-blind", "smart-cane-blind", "smart-shoes-blind"];
      return ultrasonicProjects.filter((p) => ids.includes(p)).length >= 3;
    },
  },
  {
    id: "safety-first",
    title: "Safety First",
    description: "Complete 3 safety-related projects",
    icon: "🛡️",
    condition: (ids) => {
      const safetyProjects = ["alcohol-detector-buzzer", "gas-leakage-alarm", "anti-theft-alarm", "safety-helmet-alert", "gas-safety-countdown", "smart-bus-door"];
      return safetyProjects.filter((p) => ids.includes(p)).length >= 3;
    },
  },
  {
    id: "accessibility-hero",
    title: "Accessibility Hero",
    description: "Complete all projects for visually impaired",
    icon: "♿",
    condition: (ids) => ["smart-glasses-blind", "smart-cane-blind", "smart-shoes-blind"].every((p) => ids.includes(p)),
  },
  {
    id: "completionist",
    title: "Completionist",
    description: "Complete ALL 32 projects!",
    icon: "👑",
    condition: (ids) => ids.length >= 32,
  },
];
