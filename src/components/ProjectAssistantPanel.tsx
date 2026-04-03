import { useState, useRef, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { PureMultimodalInput, type Attachment, type UIMessage } from "@/components/ui/multimodal-ai-chat-input";
import { ShiningText } from "@/components/ui/shining-text";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  attachments?: Attachment[];
}

interface ProjectAssistantPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
}

export default function ProjectAssistantPanel({ isOpen, onOpenChange, projectTitle }: ProjectAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          role: "model",
          text: `Hi! I'm Heyro. I see you're working on **${projectTitle}**. How can I help you with this project?`,
        },
      ]);
    }
  }, [isOpen, projectTitle, messages.length]);

  const handleSendMessage = useCallback(async ({ input, attachments: newAttachments }: { input: string; attachments: Attachment[] }) => {
    if (!input.trim() && newAttachments.length === 0) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", text: userText, attachments: newAttachments }]);
    setIsGenerating(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "dummy_key";
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are Heyro, a friendly and encouraging AI teaching assistant for a STEM platform. You help students (Classes 6-8) learn Arduino, electronics, and coding. Keep your answers concise, encouraging, and easy to understand for middle schoolers. Use markdown for formatting. The user is currently working on the project: "${projectTitle}". Provide specific guidance and help related to this project.`;

      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Heyro'}: ${m.text}`).join('\n');
      const prompt = `${history}\nUser: ${userText}\nHeyro:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { systemInstruction },
      });

      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "model", text: response.text || "I'm not sure how to answer that." }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "model", text: "Oops! I'm having trouble connecting right now. Please make sure your Gemini API key is set in the environment." },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }, [messages, projectTitle]);

  const handleStopGenerating = useCallback(() => {
    setIsGenerating(false);
  }, []);

  const uiMessages: UIMessage[] = messages.map(m => ({
    id: m.id,
    content: m.text,
    role: m.role,
    attachments: m.attachments
  }));

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col h-full p-0 bg-slate-50 border-l border-slate-200 dark:bg-slate-950 dark:border-slate-800">
        <SheetHeader className="px-6 py-5 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-800">
          <SheetTitle className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
              <img src="/logo.png" alt="Heyro Logo" className="h-7 w-7 object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col items-start">
              {isGenerating ? (
                <ShiningText text="Heyro is thinking..." />
              ) : (
                <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">Heyro Assistant</span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online Guide
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] rounded-3xl px-5 py-3.5 text-sm transition-all duration-300 ${
                  msg.role === "user"
                    ? "bg-slate-900 text-white rounded-br-none shadow-md"
                    : "bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-sm dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800"
                }`}
              >
                {msg.role === "model" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-pre:rounded-2xl dark:prose-pre:bg-slate-800 dark:prose-pre:border-slate-700">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.attachments.map((att, idx) => (
                          <div key={idx} className="text-[10px] bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 border border-white/20">
                            <span className="truncate max-w-[120px]">{att.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-3xl rounded-bl-none border border-slate-100 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-slate-200 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-800">
          <PureMultimodalInput
            chatId="project-assistant"
            messages={uiMessages}
            attachments={attachments}
            setAttachments={setAttachments}
            onSendMessage={handleSendMessage}
            onStopGenerating={handleStopGenerating}
            isGenerating={isGenerating}
            canSend={true}
            selectedVisibilityType="private"
            className="bg-transparent border-none p-0 gap-6"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
