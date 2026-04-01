import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home", to: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Blog", href: "/blog", to: "/blog" },
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
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const renderLink = (l: typeof navLinks[0], onClick?: () => void, className?: string) => {
    if (l.to) {
      return (
        <Link key={l.label} to={l.to} onClick={onClick} className={className}>
          {l.label}
        </Link>
      );
    }
    if (!isHome && l.href.startsWith("#")) {
      return (
        <Link key={l.label} to={`/${l.href}`} onClick={onClick} className={className}>
          {l.label}
        </Link>
      );
    }
    return (
      <a key={l.label} href={l.href} onClick={onClick} className={className}>
        {l.label}
      </a>
    );
  };

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
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold">
              <span className="gradient-text">Romance</span>{" "}
              <span className="text-foreground">Favorita</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) =>
              renderLink(l, undefined, "text-sm font-medium text-muted-foreground hover:text-primary transition-colors")
            )}
            <a
              href={isHome ? "#cadastro" : "/#cadastro"}
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
                {navLinks.map((l) =>
                  renderLink(l, () => setOpen(false), "text-sm font-medium text-muted-foreground hover:text-primary py-2")
                )}
                <a
                  href={isHome ? "#cadastro" : "/#cadastro"}
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
