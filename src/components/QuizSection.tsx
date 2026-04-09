import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { WHATSAPP_URL } from "@/lib/whatsapp";

const questions = [
  {
    question: "Quanto tempo você tem disponível por dia?",
    options: [
      { label: "Menos de 1 hora", score: 1 },
      { label: "1 a 2 horas", score: 2 },
      { label: "3 a 5 horas", score: 3 },
      { label: "Tempo integral", score: 4 },
    ],
  },
  {
    question: "Você já vendeu algo antes?",
    options: [
      { label: "Sim, já tenho experiência", score: 3 },
      { label: "Já tentei, mas não deu certo", score: 2 },
      { label: "Nunca vendi nada", score: 1 },
    ],
  },
  {
    question: "Qual seu objetivo hoje?",
    options: [
      { label: "Renda extra", score: 2 },
      { label: "Renda principal", score: 3 },
      { label: "Quero testar primeiro", score: 1 },
    ],
  },
];

type Profile = "iniciante" | "intermediario" | "avancado";

const profiles: Record<Profile, { range: string; message: string }> = {
  iniciante: {
    range: "R$500 a R$1.500",
    message: "Você pode começar com uma renda de R$500 a R$1.500 por mês!",
  },
  intermediario: {
    range: "R$1.500 a R$3.000",
    message: "Você tem potencial para ganhar entre R$1.500 a R$3.000 por mês!",
  },
  avancado: {
    range: "acima de R$3.000",
    message: "Você pode construir uma renda acima de R$3.000 mensais!",
  },
};

const getProfile = (totalScore: number): Profile => {
  if (totalScore <= 4) return "iniciante";
  if (totalScore <= 7) return "intermediario";
  return "avancado";
};

const QuizSection = () => {
  const [step, setStep] = useState(0); // 0-2 = questions, 3 = result, 4 = form
  const [answers, setAnswers] = useState<number[]>([]);
  const [form, setForm] = useState({ nome: "", whatsapp: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const totalSteps = questions.length + 1; // questions + result
  const progress = Math.min(((step + 1) / totalSteps) * 100, 100);

  const handleAnswer = useCallback(
    (score: number) => {
      if (transitioning) return;
      setTransitioning(true);
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);
      setTimeout(() => {
        setStep((s) => s + 1);
        setTransitioning(false);
      }, 400);
    },
    [answers, transitioning]
  );

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const profile = getProfile(totalScore);
  const result = profiles[profile];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.whatsapp.trim() || !form.email.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Dados enviados! Redirecionando para o WhatsApp...");
      window.open(WHATSAPP_URL, "_blank");
    }, 800);
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setForm({ nome: "", whatsapp: "", email: "" });
  };

  return (
    <section id="quiz" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            Descubra quanto você pode{" "}
            <span className="gradient-text">ganhar</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Responda 3 perguntas rápidas e veja seu potencial de ganhos.
          </p>
          <p className="text-primary font-semibold mt-2 text-sm">
            +3.000 mulheres já começaram
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="min-h-[360px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Questions */}
              {step < questions.length && (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    Pergunta {step + 1} de {questions.length}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                    {questions[step].question}
                  </h3>
                  <div className="space-y-3">
                    {questions[step].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt.score)}
                        disabled={transitioning}
                        className="w-full text-left px-5 py-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 text-foreground font-medium active:scale-[0.98]"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {step === questions.length && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full text-center"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Seu resultado está pronto!
                  </h3>
                  <div className="bg-primary/10 rounded-2xl p-6 mb-6">
                    <p className="text-primary text-3xl md:text-4xl font-extrabold mb-2">
                      {result.range}
                    </p>
                    <p className="text-foreground/80">{result.message}</p>
                  </div>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Para receber um plano personalizado + acesso para começar,
                    preencha abaixo:
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    {[
                      {
                        key: "nome",
                        label: "Nome completo",
                        type: "text",
                        placeholder: "Seu nome",
                      },
                      {
                        key: "whatsapp",
                        label: "WhatsApp",
                        type: "tel",
                        placeholder: "(00) 00000-0000",
                      },
                      {
                        key: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "seu@email.com",
                      },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="text-foreground/80 text-sm font-medium mb-1 block">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          required
                          placeholder={f.placeholder}
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) =>
                            setForm({ ...form, [f.key]: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-card text-foreground border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-glow w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base disabled:opacity-50"
                    >
                      {loading ? "Enviando..." : "QUERO COMEÇAR AGORA"}
                    </button>
                    <p className="text-center text-xs text-muted-foreground">
                      Sem compromisso • Resposta imediata
                    </p>
                  </form>

                  <button
                    onClick={restart}
                    className="mt-4 text-sm text-primary underline"
                  >
                    Refazer quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
