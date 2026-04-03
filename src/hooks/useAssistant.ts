import { create } from 'zustand';

interface AssistantState {
  isOpen: boolean;
  context: string | null;
  openAssistant: (context?: string) => void;
  closeAssistant: () => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  isOpen: false,
  context: null,
  openAssistant: (context = null) => set({ isOpen: true, context }),
  closeAssistant: () => set({ isOpen: false, context: null }),
}));
