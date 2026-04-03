import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sparkles, X, MessageCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssistantStore } from "@/hooks/useAssistant";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function NemoAssistant() {
  const location = useLocation();
  const { isOpen, context, openAssistant, closeAssistant } = useAssistantStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial greeting based on context
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (context) {
        setMessages([
          {
            role: "model",
            text: `Hi! I see you're looking at **${context}**. How can I help you with this project?`,
          },
        ]);
      } else {
        setMessages([
          {
            role: "model",
            text: "Hi! I'm Heyro, your AI assistant. I can help you navigate the curriculum, explain concepts, or guide you through any Arduino project. What would you like to build today?",
          },
        ]);
      }
    }
  }, [isOpen, context, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      // Initialize Gemini API
      const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey });

      // Build system instruction
      let systemInstruction = "You are Heyro, a friendly and encouraging AI teaching assistant for a STEM platform. You help students (Classes 6-8) learn Arduino, electronics, and coding. Keep your answers concise, encouraging, and easy to understand for middle schoolers. Use markdown for formatting.";
      
      if (context) {
        systemInstruction += `\n\nThe user is currently working on the project: "${context}". Provide specific guidance and help related to this project.`;
      } else {
        systemInstruction += `\n\nThe user is browsing the platform. Guide them to explore projects, check their achievements, and learn about sensors and coding.`;
      }

      // Convert history to Gemini format
      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Heyro'}: ${m.text}`).join('\n');
      const prompt = `${history}\nUser: ${userText}\nHeyro:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      setMessages((prev) => [...prev, { role: "model", text: response.text || "I'm not sure how to answer that." }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Oops! I'm having trouble connecting right now. Please make sure your Gemini API key is set in the environment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const allowedPaths = ["/", "/getting-started"];
  if (!allowedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      {/* Floating trigger */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="absolute -inset-0.5 rounded-full bg-[conic-gradient(from_0deg,theme(colors.emerald.400),theme(colors.blue.500),theme(colors.purple.500),theme(colors.emerald.400))] animate-[rotate-gradient_4s_linear_infinite] blur-md opacity-80"></div>
          <button
            onClick={() => openAssistant()}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden border border-slate-200 dark:border-slate-700"
            aria-label="Open Heyro assistant"
          >
            <img src="/logo.png" alt="Heyro Logo" className="h-10 w-10 object-contain" referrerPolicy="no-referrer" />
          </button>
        </div>
      )}

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/95 backdrop-blur-2xl shadow-2xl animate-fade-in-scale dark:bg-slate-950/95 dark:border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-white/50 px-6 py-5 dark:bg-slate-900/50 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <img src="/logo.png" alt="Heyro Logo" className="h-6 w-6 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="block font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">Heyro Assistant</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" onClick={closeAssistant}>
              <X className="h-4 w-4 text-slate-500" />
            </Button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-[1.5rem] px-5 py-3.5 text-sm shadow-sm transition-all duration-300 ${
                    msg.role === "user"
                      ? "bg-slate-900 text-white rounded-br-none"
                      : "bg-white text-slate-800 rounded-bl-none border border-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800"
                  }`}
                >
                  {msg.role === "model" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-pre:rounded-2xl dark:prose-pre:bg-slate-800 dark:prose-pre:border-slate-700">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-[1.5rem] rounded-bl-none border border-slate-100 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm dark:bg-slate-900 dark:border-slate-800">
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

          {/* Input Area */}
          <div className="border-t border-slate-100 bg-white/50 p-5 backdrop-blur-xl dark:bg-slate-900/50 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={context ? `Ask about ${context}...` : "Ask Heyro anything..."}
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all dark:bg-slate-900 dark:border-slate-800 dark:focus:border-slate-700 dark:focus:ring-slate-800"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 shrink-0 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-transform active:scale-95"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
