import { motion } from "framer-motion";
import testimonial1 from "@/assets/testimonial-1.png";
import testimonialIvaneide from "@/assets/testimonial-ivaneide.jpg";
import product1 from "@/assets/product-1.png";

const testimonials = [
  {
    name: "Isidoria Pereira Abreu",
    location: "Belém/PA",
    text: "Eu amo trabalhar com as marcas Romance e Favorita! O que me deixa mais feliz é ver minhas clientes felizes e realizadas.",
    img: testimonial1,
  },
  {
    name: "Ivaneide Patrício",
    location: "Manaus/AM",
    text: "Eu gosto muito de revender todos os produtos Favorita e a Romance, porque são maravilhosos de excelente qualidade!",
    img: testimonialIvaneide,
  },
  {
    name: "Milena Cauduro Lovato",
    location: "Canoas/RS",
    text: "Além de vender, uso e confio nos produtos. Acredite em você!",
    img: product1,
  },
];

const TestimonialsSection = () => (
  <section id="depoimentos" className="section-padding bg-muted">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          O que dizem nossas <span className="gradient-text">Empreendedoras</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center"
          >
            <img
              src={t.img}
              alt={t.name}
              loading="lazy"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
            />
            <p className="text-muted-foreground italic mb-4">"{t.text}"</p>
            <p className="font-bold text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.location}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
