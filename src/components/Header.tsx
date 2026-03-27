import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const BrasilClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-xs font-medium tracking-wider">
      🕒 Horário de Brasília: <span className="font-bold">{time}</span>
    </span>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div className="bg-secondary text-secondary-foreground py-1.5 text-center">
        <BrasilClock />
      </div>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background"
        }`}
      >
        <div className="container-narrow flex items-center justify-between py-3 px-4">
          <a href="#home" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold">
              <span className="gradient-text">Romance</span>{" "}
              <span className="text-foreground">Favorita</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cadastro"
              className="btn-glow bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold"
            >
              Cadastro
            </a>
          </nav>

          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-background border-t border-border"
            >
              <div className="flex flex-col p-4 gap-3">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#cadastro"
                  onClick={() => setOpen(false)}
                  className="btn-glow bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center mt-2"
                >
                  Cadastro
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
