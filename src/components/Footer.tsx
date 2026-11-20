import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { CRIADOR_WHATSAPP_URL, WHATSAPP_URL } from "@/lib/whatsapp";

const Footer = () => (
  <footer id="contato" className="bg-secondary text-secondary-foreground pt-16 pb-28 px-4">
    <div className="container-narrow">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <h3 className="text-xl font-display font-bold mb-4">
            <span className="gradient-text">Romance</span> Favorita
          </h3>
          <p className="text-secondary-foreground/70 text-sm leading-relaxed">
            Transforme sua vida com uma renda extra e liberdade financeira. Comece hoje mesmo!
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Links Rápidos</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/70">
            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#beneficios" className="hover:text-primary transition-colors">Benefícios</a></li>
            <li><a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a></li>
            <li><a href="#cadastro" className="hover:text-primary transition-colors">Cadastro</a></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contato</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/70">
            <li>📱 WhatsApp: (91) 99837-7628</li>
            <li>📧 contato@romancefavorita.com</li>
            <li>🕒 Seg a Sex: 8h às 18h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 pt-6 text-center text-xs text-secondary-foreground/50">
        <p className="flex items-center justify-center gap-1 mb-2">
          © {new Date().getFullYear()} Cristiano e Wanda. Todos os direitos reservados.
          <Heart className="w-3 h-3 text-primary" />
        </p>
        <motion.a
          href={CRIADOR_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto mt-4 block max-w-md overflow-hidden rounded-2xl p-[2px] text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
        >
          <span className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#ec4899,#f59e0b,#22c55e,#3b82f6,#ec4899)]" aria-hidden="true" />
          <span className="relative flex items-center gap-4 rounded-2xl bg-secondary px-5 py-4">
            <motion.span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-2xl shadow-lg"
              animate={{ y: [0, -6, 0], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              🚀
            </motion.span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-secondary-foreground">Quer um site como este?</span>
              <span className="block text-xs text-secondary-foreground/70">
                Criador: <strong className="text-secondary-foreground">Rodrigo Pinheiro</strong> · fale comigo no WhatsApp
              </span>
            </span>
            <motion.span
              className="rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-md"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              Quero!
            </motion.span>
          </span>
        </motion.a>
      </div>
    </div>
  </footer>
);

export default Footer;
