import { motion } from "framer-motion";
import sheilaMello from "@/assets/sheila-mello.png";

const VoceNoComando = () => (
  <section id="sobre" className="section-padding">
    <div className="container-narrow">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src={sheilaMello}
            alt="Empreenda com a Romance Favorita"
            className="rounded-2xl shadow-xl max-w-sm mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Você no <span className="gradient-text">Comando!</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Ser Empreendedora Romance traz consigo várias vantagens para o seu dia a dia como:
            ter seu próprio negócio, organizar seus horários e conquistar uma renda extra
            através das suas vendas.
          </p>
          <a
            href="#cadastro"
            className="btn-glow inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold"
          >
            QUERO SER EMPREENDEDORA
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default VoceNoComando;
