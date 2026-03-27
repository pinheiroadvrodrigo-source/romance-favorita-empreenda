import { Heart } from "lucide-react";

const Footer = () => (
  <footer id="contato" className="bg-secondary text-secondary-foreground py-16 px-4">
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
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contato</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/70">
            <li>📱 WhatsApp: (00) 00000-0000</li>
            <li>📧 contato@romancefavorita.com</li>
            <li>🕒 Seg a Sex: 8h às 18h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 pt-6 text-center text-xs text-secondary-foreground/50">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Romance Favorita. Todos os direitos reservados.
          <Heart className="w-3 h-3 text-primary" />
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
