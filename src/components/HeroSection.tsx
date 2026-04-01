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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" className="w-5 h-5 inline-block mr-2 -mt-0.5">
                <path fill="currentColor" d="M87.184 14.2c-40.487 0-73.375 32.78-73.39 73.09a72.6 72.6 0 0 0 9.78 36.47L14.2 161.35l38.6-10.12a73.3 73.3 0 0 0 34.34 8.73h.03c40.49 0 73.38-32.79 73.39-73.1a72.6 72.6 0 0 0-21.46-51.85A72.7 72.7 0 0 0 87.184 14.2Zm0 133.74h-.03a60.9 60.9 0 0 1-31-8.49l-2.23-1.32-23.06 6.05 6.15-22.48-1.45-2.31a60.7 60.7 0 0 1-9.31-32.3c.02-33.63 27.42-61 61.13-61a60.7 60.7 0 0 1 43.15 17.89 60.7 60.7 0 0 1 17.87 43.22c-.02 33.64-27.42 61.02-61.12 61.02v-.28Z"/>
                <path fill="currentColor" d="M66.254 53.89c-1.58-3.52-3.24-3.59-4.75-3.65-1.23-.05-2.63-.05-4.03-.05a7.74 7.74 0 0 0-5.6 2.63c-1.93 2.1-7.36 7.19-7.36 17.53s7.53 20.33 8.58 21.74 14.55 23.28 35.9 31.7c17.76 6.99 21.37 5.6 25.22 5.25 3.84-.35 12.4-5.07 14.15-9.97 1.76-4.9 1.76-9.1 1.23-9.97-.53-.88-1.93-1.4-4.03-2.46s-12.4-6.12-14.33-6.82-3.33-1.05-4.73 1.05-5.43 6.82-6.66 8.23-2.46 1.58-4.56.53-8.88-3.27-16.92-10.43a63.4 63.4 0 0 1-11.71-14.57c-1.23-2.1-.13-3.24.92-4.29.95-.94 2.1-2.46 3.16-3.68a14.4 14.4 0 0 0 2.1-3.51 3.88 3.88 0 0 0-.18-3.68c-.52-1.06-4.63-11.47-6.4-15.68Z"/>
              </svg>
              FALAR NO WHATSAPP
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
