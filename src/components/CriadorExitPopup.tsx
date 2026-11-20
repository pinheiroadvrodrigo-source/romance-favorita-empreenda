import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { CRIADOR_WHATSAPP_URL } from "@/lib/whatsapp";

const STORAGE_KEY = "criador-popup-visto";

const jaViu = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const marcarVisto = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* sem storage: só não lembra */
  }
};

/**
 * Pop-up "Site criado por Rodrigo Pinheiro" que aparece quando a pessoa vai sair:
 * - computador: o mouse sai pela parte de cima da página (rumo à aba/fechar)
 * - celular: rolagem rápida para cima depois de já ter lido a página
 * Aparece no máximo uma vez por visita.
 */
const CriadorExitPopup = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const armedAt = useRef(Date.now());

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const show = () => {
      if (jaViu() || Date.now() - armedAt.current < 8000) return;
      marcarVisto();
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };

    let lastY = window.scrollY;
    let lastT = Date.now();
    let maxY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const t = Date.now();
      maxY = Math.max(maxY, y);
      const speed = (lastY - y) / Math.max(t - lastT, 1); // px/ms subindo
      if (maxY > 1200 && speed > 2.5 && y < maxY - 600) show();
      lastY = y;
      lastT = t;
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-6 pt-8 text-center shadow-2xl"
            initial={{ scale: 0.6, y: 40, rotate: -3 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-pink-500 via-amber-400 to-green-500 animate-pulse" />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-3xl shadow-lg"
              animate={{ y: [0, -8, 0], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              🚀
            </motion.div>

            <p className="text-xs font-semibold uppercase tracking-widest text-pink-500">Espera aí!</p>
            <h3 className="mt-1 text-2xl font-display font-bold text-gray-900">Gostou deste site?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Ele foi criado por <strong className="text-gray-900">Rodrigo Pinheiro</strong>. Quer um site
              bonito assim, que traz clientes pelo WhatsApp, para o <strong>seu negócio</strong>?
            </p>

            <ul className="mt-4 space-y-1 text-left text-sm text-gray-700">
              <li>✅ Site profissional pronto em poucos dias</li>
              <li>✅ Botão de WhatsApp e formulário de contato</li>
              <li>✅ Aparece no Google com o seu domínio</li>
            </ul>

            <motion.a
              href={CRIADOR_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5" /> Quero um site como esse!
            </motion.a>
            <button onClick={() => setOpen(false)} className="mt-3 text-xs text-gray-400 underline">
              Agora não
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CriadorExitPopup;
