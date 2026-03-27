import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import TestimonialsSection from "@/components/TestimonialsSection";
import BenefitsSection from "@/components/BenefitsSection";
import { motion } from "framer-motion";

interface LandingPageProps {
  title: string;
  subtitle: string;
  highlight: string;
}

const LandingPage = ({ title, subtitle, highlight }: LandingPageProps) => (
  <>
    <Header />
    <main>
      <section className="section-padding bg-secondary text-center">
        <div className="container-narrow">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-secondary-foreground mb-4"
          >
            {title} <span className="gradient-text">{highlight}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
          <a
            href="#cadastro"
            className="btn-glow inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold"
          >
            QUERO COMEÇAR AGORA
          </a>
        </div>
      </section>
      <BenefitsSection />
      <TestimonialsSection />
      <RegistrationForm />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export const Revendedora = () => (
  <LandingPage
    title="Seja uma"
    highlight="Revendedora!"
    subtitle="Cadastre-se gratuitamente e comece a lucrar até 40% revendendo produtos de qualidade."
  />
);

export const RendaExtra = () => (
  <LandingPage
    title="Conquiste sua"
    highlight="Renda Extra!"
    subtitle="Trabalhe no seu tempo e ganhe dinheiro revendendo produtos que as mulheres amam."
  />
);

export const TrabalharDeCasa = () => (
  <LandingPage
    title="Trabalhe de"
    highlight="Casa!"
    subtitle="Monte seu negócio sem sair de casa. Sem chefe, sem horário fixo, com total liberdade."
  />
);
