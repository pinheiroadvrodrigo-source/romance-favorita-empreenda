import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    cidade: "",
    bairro: "",
  });
  const [loading, setLoading] = useState(false);

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.cpf.trim() || !form.data_nascimento) {
      toast.error("Preencha todos os campos!");
      return;
    }
    setLoading(true);

    // Save to database
    const { error } = await supabase.from("registrations").insert({
      nome: form.nome.trim(),
      cpf: form.cpf.replace(/\D/g, ""),
      data_nascimento: form.data_nascimento,
    });

    if (error) {
      toast.error("Erro ao salvar cadastro.");
      setLoading(false);
      return;
    }

    toast.success("Cadastro enviado com sucesso! Redirecionando para o WhatsApp...");
    window.open(WHATSAPP_URL, "_blank");
    setForm({ nome: "", cpf: "", data_nascimento: "" });
    setLoading(false);
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
            <div>
              <label className="text-secondary-foreground/80 text-sm font-medium mb-1 block">
                Nome completo
              </label>
              <input
                type="text"
                required
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-border focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-secondary-foreground/80 text-sm font-medium mb-1 block">
                CPF
              </label>
              <input
                type="text"
                required
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: formatCPF(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                maxLength={14}
              />
            </div>

            <div>
              <label className="text-secondary-foreground/80 text-sm font-medium mb-1 block">
                Data de Nascimento
              </label>
              <input
                type="date"
                required
                value={form.data_nascimento}
                onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background text-foreground border border-border focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

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
