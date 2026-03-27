import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Preciso pagar alguma taxa para me cadastrar?", a: "Não! O cadastro é 100% gratuito. Você não precisa investir nada para começar." },
  { q: "Qual o lucro em cada venda?", a: "Você pode lucrar até 40% em cada venda, dependendo dos produtos e da categoria." },
  { q: "Preciso ter experiência em vendas?", a: "Não é necessário. Oferecemos treinamento e suporte completo para você começar." },
  { q: "Como recebo os produtos?", a: "Após o cadastro, um distribuidor autorizado entrará em contato para organizar a entrega." },
  { q: "Posso revender em qualquer lugar do Brasil?", a: "Sim! Temos distribuidores em todo o território nacional." },
  { q: "Quanto tempo leva para aprovar meu cadastro?", a: "A análise leva até 5 dias úteis. Você será contatada assim que for aprovada." },
];

const FAQSection = () => (
  <section className="section-padding">
    <div className="container-narrow max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Perguntas <span className="gradient-text">Frequentes</span>
        </h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-4">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
