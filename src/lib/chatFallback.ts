/**
 * Respostas prontas da atendente, com base no que está escrito no site.
 * Usadas quando a IA não responde (sem crédito, fora do ar, sem internet etc.),
 * para a visitante nunca ficar sem resposta.
 */
const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

type Regra = { palavras: string[]; resposta: string };

const WHATS = "(91) 99837-7628";

const REGRAS: Regra[] = [
  {
    palavras: ["taxa", "pagar", "custa", "custo", "investi", "dinheiro para comecar", "gratis", "gratuito", "preciso de dinheiro"],
    resposta:
      "Não precisa pagar nada! 💖 O cadastro é 100% gratuito e não tem investimento inicial obrigatório. É consignado: você paga só o que vender. O pedido mínimo é de R$ 230.",
  },
  {
    palavras: ["quanto tempo", "demora", "aprova", "analise", "prazo"],
    resposta: "A análise do cadastro leva até 5 dias úteis ✨ Assim que for aprovada, você é contatada.",
  },
  {
    palavras: ["quanto", "ganh", "lucr", "renda", "comissao", "porcent", "%"],
    resposta:
      "Você lucra de 30% a 40% em cada venda ✨ Exemplo: vendendo R$ 1.000, lucra de R$ 300 a R$ 400; vendendo R$ 2.000, de R$ 600 a R$ 800; vendendo R$ 5.000, de R$ 1.500 a R$ 2.000. Depende das suas vendas!",
  },
  {
    palavras: ["pedido minimo", "minimo"],
    resposta: "O pedido mínimo é de R$ 230 🌹 E é consignado: você paga apenas o que vender.",
  },
  {
    palavras: ["receb", "entrega", "produto chega", "como chega", "distribuidor"],
    resposta:
      "Depois do cadastro, um distribuidor autorizado entra em contato com você e organiza a entrega dos produtos 💖 Detalhes de entrega ele te passa direitinho.",
  },
  {
    palavras: ["experiencia", "nunca vendi", "nao sei vender", "treinamento", "suporte", "ajuda para vender"],
    resposta:
      "Não precisa de experiência! 🌹 A gente oferece treinamento e suporte completo, com equipe dedicada para te ajudar a começar com confiança.",
  },
  {
    palavras: ["cidade", "estado", "brasil", "onde posso", "regiao", "interior", "qualquer lugar"],
    resposta: "Sim! Dá para revender em qualquer lugar do Brasil 💖 Temos distribuidores em todo o país.",
  },
  {
    palavras: ["estoque", "consign"],
    resposta: "Você começa sem estoque 🌹 O sistema é consignado: paga apenas o que vender.",
  },
  {
    palavras: ["horario", "tempo livre", "de casa", "casa", "flexivel", "chefe"],
    resposta:
      "Você trabalha de casa, no seu horário e sem chefe ✨ Vende pelo catálogo digital e gerencia tudo pelo app no celular.",
  },
  {
    palavras: ["app", "aplicativo", "catalogo"],
    resposta: "Você vende com catálogo digital e gerencia tudo por um app no celular 💖 O distribuidor te passa o acesso depois da aprovação.",
  },
  {
    palavras: ["preco", "valor da peca", "valores", "tamanho", "cor", "modelo", "frete", "pix", "cartao", "boleto", "forma de pagamento"],
    resposta: `Esses detalhes (preços, modelos, tamanhos, frete e pagamento) o distribuidor passa pra você 💖 Fale no WhatsApp ${WHATS} que te explicam tudo!`,
  },
  {
    palavras: ["produto", "lingerie", "marca", "vende o que", "o que vende", "qualidade"],
    resposta:
      "Você revende as marcas Romance e Favorita: lingerie e moda íntima de altíssima qualidade, de marcas reconhecidas no mercado 🌹",
  },
  {
    palavras: ["quem sao", "quem e voce", "cristiano", "wanda", "empresa"],
    resposta:
      "Somos Cristiano e Wanda, licenciados da Romance 💖 Ajudamos mulheres a ter renda extra revendendo as marcas Romance e Favorita.",
  },
  {
    palavras: ["contato", "whats", "telefone", "email", "e-mail", "falar com", "atendimento"],
    resposta: `Fale com a gente no WhatsApp ${WHATS} ou pelo e-mail contato@romancefavorita.com 💖 Atendimento de segunda a sexta, das 8h às 18h.`,
  },
  {
    palavras: ["quem fez", "fez o site", "fez esse site", "criou", "criador", "rodrigo", "quero um site"],
    resposta:
      "Este site foi criado por Rodrigo Pinheiro ✨ Quer um igual para o seu negócio? Fale com ele no WhatsApp (91) 99119-8584.",
  },
  {
    palavras: ["como funciona", "funciona", "comecar", "passo", "cadastr", "ser revendedora", "quero ser", "empreendedora", "revender"],
    resposta:
      "É simples! 💖 1) Faça o cadastro gratuito no formulário do site; 2) a análise leva até 5 dias úteis; 3) um distribuidor entra em contato; 4) você começa a vender e lucra de 30% a 40%.",
  },
  {
    palavras: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "tudo bem"],
    resposta: "Oi, linda! 💖 Posso te explicar como funciona, quanto dá para ganhar ou como fazer seu cadastro gratuito. O que você quer saber?",
  },
  {
    palavras: ["obrigad", "valeu", "ok", "entendi"],
    resposta: "Imagina! 🌹 Quando quiser começar, é só preencher o cadastro gratuito aqui no site. Estou por aqui se surgir outra dúvida!",
  },
];

export const respostaPronta = (pergunta: string): string => {
  const p = norm(pergunta);
  for (const r of REGRAS) {
    if (r.palavras.some((w) => {
      const n = norm(w);
      // palavras curtas só valem inteiras (ex.: "oi" não casa com "noite")
      return n.length <= 4 ? new RegExp(`(^|[^a-z])${n.replace(/[%]/g, "\\$&")}([^a-z]|$)`).test(p) : p.includes(n);
    })) return r.resposta;
  }
  return `Boa pergunta! 💖 Para essa, o melhor é falar direto com a gente no WhatsApp ${WHATS}. E se quiser começar, o cadastro aqui no site é gratuito!`;
};
