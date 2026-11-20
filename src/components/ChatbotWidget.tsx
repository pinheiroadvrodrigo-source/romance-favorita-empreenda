import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Heart } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import chatbotAvatar from "@/assets/chatbot-avatar.png";
import { CHAT_KNOWLEDGE } from "@/lib/chatKnowledge";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-romance`;

const quickActions = [
  { label: "Quero ser empreendedora", message: "Quero ser empreendedora Romance Favorita!" },
  { label: "Como funciona?", message: "Como funciona para ser revendedora?" },
  { label: "Quanto posso ganhar?", message: "Quanto posso ganhar revendendo?" },
  { label: "Preciso pagar algo?", message: "Preciso pagar alguma taxa ou investir para começar?" },
];

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages: [{ role: "system", content: CHAT_KNOWLEDGE }, ...messages] }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Erro de conexão" }));
    onError(err.error || "Erro ao conectar");
    return;
  }

  if (!resp.body) { onError("Sem resposta"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
  onDone();
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto bubble after 5s, auto-hide after another 5s
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!isOpen) setShowBubble(true);
    }, 5000);
    return () => clearTimeout(showTimer);
  }, [isOpen]);

  useEffect(() => {
    if (showBubble && !isOpen) {
      const hideTimer = setTimeout(() => {
        setShowBubble(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [showBubble, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const temMouse = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (isOpen && temMouse && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowBubble(false);
    if (messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Oi linda! 💖 Quer saber como começar a ganhar renda extra com a gente?\n\nEscolha uma opção abaixo ou me pergunte qualquer coisa!"
      }]);
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const allMessages = [...messages, userMsg];

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: allMessages,
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (msg) => {
          setMessages(prev => [...prev, { role: "assistant", content: `Desculpe, tive um probleminha. 😅 Que tal falar direto no WhatsApp?` }]);
          setIsLoading(false);
        },
      });
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Ops, algo deu errado. Tente novamente! 💖" }]);
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const scrollToForm = () => {
    setIsOpen(false);
    document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Auto bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="fixed top-28 right-[4.5rem] sm:right-24 z-[60] max-w-[220px] bg-white rounded-2xl shadow-xl p-4 border border-pink-100 cursor-pointer"
            onClick={handleOpen}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
              className="absolute -top-2 -right-2 bg-pink-100 rounded-full p-0.5"
            >
              <X className="h-3.5 w-3.5 text-pink-500" />
            </button>
            <p className="text-sm text-gray-700">
              Oi linda! 💖 Quer saber como ganhar renda extra com a gente?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button (canto superior direito) */}
      <div className="fixed top-24 right-1.5 sm:right-3 z-[60] flex flex-col items-center gap-1">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
        className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-xl flex items-center justify-center overflow-hidden ring-2 ring-pink-300 ring-offset-2"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="w-full h-full">
              <img src={chatbotAvatar} alt="Atendimento" className="w-full h-full object-cover" loading="lazy" width={512} height={512} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed top-40 sm:top-44 right-2 sm:right-3 z-[60] w-[min(280px,calc(100vw-1.5rem))] sm:w-[300px] max-h-[52vh] flex flex-col rounded-2xl shadow-2xl border border-pink-100 bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-3 py-2 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" fill="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">Romance Favorita</p>
                <p className="text-white/80 text-[11px] flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-online-dot" />Estamos online</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-pink-50/30 min-h-[100px] max-h-[26vh]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-3 py-2 text-[13px] leading-snug whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-br-md"
                        : "bg-white text-gray-700 shadow-sm border border-pink-50 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-pink-50">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions (show only at start) */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-white border-t border-pink-50 pt-2">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(action.message)}
                    className="text-[11px] bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full px-2.5 py-1 transition-colors border border-pink-100"
                  >
                    {action.label}
                  </button>
                ))}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] bg-green-50 hover:bg-green-100 text-green-700 rounded-full px-2.5 py-1 transition-colors border border-green-100"
                >
                  💬 Falar no WhatsApp
                </a>
                <button
                  onClick={scrollToForm}
                  className="text-[11px] bg-rose-500 hover:bg-rose-600 text-white rounded-full px-2.5 py-1 transition-colors font-medium"
                >
                  ✨ QUERO SER EMPREENDEDORA
                </button>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2 p-2 bg-white border-t border-pink-50"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 min-w-0 text-base sm:text-[13px] bg-pink-50/50 rounded-full px-3 py-1.5 outline-none focus:ring-2 focus:ring-pink-300 border border-pink-100 text-gray-700 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
