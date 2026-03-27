import { motion } from "framer-motion";
import { UserPlus, Clock, Phone, ShoppingBag } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Cadastro online gratuito", desc: "Preencha o formulário em poucos minutos." },
  { icon: Clock, title: "Aguarde análise", desc: "Sua solicitação será analisada em até 5 dias." },
  { icon: Phone, title: "Contato com distribuidor", desc: "Um distribuidor entrará em contato com você." },
  { icon: ShoppingBag, title: "Comece a vender!", desc: "Inicie suas vendas e conquiste sua renda extra." },
];

const HowItWorks = () => (
  <section id="como-funciona" className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Como <span className="gradient-text">Funciona?</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center relative"
          >
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              {i + 1}
            </div>
            <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="#cadastro"
          className="btn-glow inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold"
        >
          QUERO COMEÇAR AGORA
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorks;
