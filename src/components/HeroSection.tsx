import { motion } from "framer-motion";
import bannerEmpreender from "@/assets/banner-empreender.png";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="bg-secondary">
        <div className="container-narrow px-4 py-16 md:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-secondary-foreground mb-6 text-balance"
          >
            Independência para{" "}
            <span className="gradient-text">realizar seus sonhos!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl mx-auto mb-10"
          >
            Revenda produtos lindos, inovadores e de altíssima qualidade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#cadastro"
              className="btn-glow bg-primary text-primary-foreground px-8 py-4 rounded-lg text-base font-bold tracking-wide"
            >
              QUERO SER EMPREENDEDORA
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary text-primary-foreground px-8 py-4 rounded-lg text-base font-bold tracking-wide hover:bg-primary/20 transition-colors"
            >
              💬 FALAR NO WHATSAPP
            </a>
          </motion.div>
        </div>
      </div>

      <div className="w-full">
        <img
          src={bannerEmpreender}
          alt="Venha empreender com a gente - Lucre até 40%"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      <div className="bg-background py-12 md:py-16">
        <div className="container-narrow px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <iframe
              src="https://www.youtube.com/embed/NJWbli54zL8?autoplay=0&rel=0&modestbranding=1&playsinline=1"
              title="Romance Favorita"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
