import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "5500000000000";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    cidade: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build WhatsApp message
    const msg = `Novo cadastro Romance Favorita!\n\nNome: ${form.nome}\nWhatsApp: ${form.whatsapp}\nEmail: ${form.email}\nCidade/Estado: ${form.cidade}\nInteresse: Quero revender`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      toast.success("Cadastro enviado com sucesso! Redirecionando para o WhatsApp...");
      window.open(url, "_blank");
      setForm({ nome: "", whatsapp: "", email: "", cidade: "" });
    }, 800);
  };

  return (
    <section id="cadastro" className="section-padding bg-secondary">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground text-center mb-4">
            Comece <span className="gradient-text">Agora!</span>
          </h2>
          <p className="text-secondary-foreground/70 text-center mb-8">
            Preencha o formulário e dê o primeiro passo rumo à sua independência financeira.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome" },
              { key: "whatsapp", label: "WhatsApp", type: "tel", placeholder: "(00) 00000-0000" },
              { key: "email", label: "Email", type: "email", placeholder: "seu@email.com" },
              { key: "cidade", label: "Cidade / Estado", type: "text", placeholder: "Ex: São Paulo/SP" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-secondary-foreground/80 text-sm font-medium mb-1 block">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            ))}

            <div className="bg-primary/10 rounded-lg p-3 text-sm text-secondary-foreground/80">
              ✅ Interesse: Quero revender
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base disabled:opacity-50"
            >
              {loading ? "Enviando..." : "QUERO COMEÇAR AGORA"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationForm;
