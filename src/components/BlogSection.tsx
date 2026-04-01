import { motion } from "framer-motion";
import { BookOpen, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const posts = [
  {
    title: "Como ganhar dinheiro revendendo lingerie",
    excerpt: "Descubra como mulheres em todo o Brasil estão conquistando sua independência financeira.",
    tag: "Renda Extra",
  },
  {
    title: "Renda extra trabalhando de casa",
    excerpt: "Saiba como montar seu negócio sem sair de casa e no seu próprio ritmo.",
    tag: "Trabalhar de Casa",
  },
  {
    title: "Como se tornar uma revendedora de sucesso",
    excerpt: "Dicas práticas para você começar a vender e crescer como empreendedora.",
    tag: "Empreendedorismo",
  },
  {
    title: "Empreendedorismo feminino do zero",
    excerpt: "Um guia completo para mulheres que querem empreender sem experiência.",
    tag: "Empreendedorismo Feminino",
  },
];

const BlogSection = () => (
  <section id="blog" className="section-padding bg-muted">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          <span className="gradient-text">Blog</span>
        </h2>
        <p className="text-muted-foreground">Dicas e conteúdos para empreendedoras.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
          >
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              {p.tag}
            </span>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> {p.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#25D366] hover:underline"
            >
              <MessageCircle className="w-4 h-4" /> Fale Conosco
            </a>
          </motion.article>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/blog"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Ver todos os artigos →
        </Link>
      </div>
    </div>
  </section>
);

export default BlogSection;
