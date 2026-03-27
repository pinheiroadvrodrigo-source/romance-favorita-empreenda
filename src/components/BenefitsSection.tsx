import { motion } from "framer-motion";
import { Clock, Star, ShoppingBag, DollarSign, Headphones, Smartphone } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Horário Flexível", desc: "Trabalhe no seu tempo, sem chefe." },
  { icon: Star, title: "Produtos de Qualidade", desc: "Marcas reconhecidas no mercado." },
  { icon: ShoppingBag, title: "Venda Fácil", desc: "Catálogo completo e suporte." },
  { icon: DollarSign, title: "Renda Extra", desc: "Lucre até 40% em cada venda." },
  { icon: Headphones, title: "Suporte Completo", desc: "Equipe dedicada para ajudar." },
  { icon: Smartphone, title: "App para Gestão", desc: "Gerencie tudo pelo celular." },
];

const BenefitsSection = () => (
  <section id="beneficios" className="section-padding bg-muted">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Por que ser uma <span className="gradient-text">Empreendedora?</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Descubra as vantagens de fazer parte da maior rede de revendedoras do Brasil.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <b.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">{b.title}</h3>
            <p className="text-muted-foreground text-sm">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
