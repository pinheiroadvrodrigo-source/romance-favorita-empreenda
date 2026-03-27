import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5591991198584";

const examples = [
  { vendas: 1000, lucro30: 300, lucro40: 400 },
  { vendas: 2000, lucro30: 600, lucro40: 800 },
  { vendas: 5000, lucro30: 1500, lucro40: 2000 },
];

const tips = [
  "Ganhe de 30% a 40% sobre cada venda",
  "Sem investimento inicial obrigatório",
  "Pedido mínimo de R$230",
  "Trabalhe de casa com catálogo digital",
  "Pague apenas o que vender (consignado)",
];

const highlights = [
  "Comece sem estoque",
  "Sem risco",
  "Renda extra real",
];

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>();

  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{formatCurrency(display)}</>;
};

const EarningsSimulator = () => {
  const [vendas, setVendas] = useState(1000);
  const lucro30 = Math.round(vendas * 0.3);
  const lucro40 = Math.round(vendas * 0.4);
  const isValid = vendas >= 230;

  const handleCTA = () => {
    const msg = `Olá, fiz a simulação e quero começar como empreendedora!\nVendas estimadas: ${formatCurrency(vendas)}\nLucro potencial: ${formatCurrency(lucro30)} a ${formatCurrency(lucro40)}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section id="simulador" className="section-padding bg-secondary">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mb-3">
            Simule quanto você pode{" "}
            <span className="gradient-text">ganhar</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg">
            Veja na prática quanto você pode lucrar revendendo produtos Romance
            e Favorita.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-lg mb-8"
          >
            <label className="text-foreground font-semibold text-lg block mb-4">
              Quanto você pretende vender por mês?
            </label>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-primary">R$</span>
              <input
                type="number"
                min={230}
                max={50000}
                step={100}
                value={vendas}
                onChange={(e) => setVendas(Number(e.target.value) || 0)}
                className="flex-1 text-3xl font-bold px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            {!isValid && vendas > 0 && (
              <p className="text-destructive text-sm mt-1">
                Pedido mínimo: R$230
              </p>
            )}

            <input
              type="range"
              min={230}
              max={10000}
              step={100}
              value={vendas}
              onChange={(e) => setVendas(Number(e.target.value))}
              className="w-full mt-4 accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>R$230</span>
              <span>R$10.000</span>
            </div>

            {/* Results */}
            {isValid && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Com 30% (Romance)
                    </p>
                    <p className="text-2xl md:text-3xl font-extrabold text-primary">
                      <AnimatedNumber value={lucro30} />
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Com 40% (Romance + Favorita)
                    </p>
                    <p className="text-2xl md:text-3xl font-extrabold text-primary">
                      <AnimatedNumber value={lucro40} />
                    </p>
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  💡 Muitas empreendedoras começam com R$1.000 a R$2.000 por mês
                </p>

                <button
                  onClick={handleCTA}
                  className="btn-glow w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-base mt-2"
                >
                  QUERO COMEÇAR AGORA
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Sem compromisso • Resposta imediata
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Examples */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {examples.map((ex) => (
              <motion.div
                key={ex.vendas}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setVendas(ex.vendas)}
                className="bg-card rounded-xl p-4 text-center cursor-pointer border border-border hover:border-primary transition-colors"
              >
                <p className="text-xs text-muted-foreground mb-1">
                  Venda de {formatCurrency(ex.vendas)}
                </p>
                <p className="text-sm font-bold text-foreground">
                  30% → {formatCurrency(ex.lucro30)}
                </p>
                <p className="text-sm font-bold text-primary">
                  40% → {formatCurrency(ex.lucro40)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {highlights.map((h) => (
              <span
                key={h}
                className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm"
              >
                ✅ {h}
              </span>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-bold text-foreground mb-3">
              💡 Como funciona
            </h3>
            <ul className="space-y-2">
              {tips.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-foreground/80 text-sm"
                >
                  <span className="text-primary mt-0.5">•</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningsSimulator;
