import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é a assistente virtual do site Romance Favorita — revenda de lingerie feminina.

Seu nome: Atendimento Romance Favorita
Tom de voz: Amigável, feminino, acolhedor, motivador. Use emojis com moderação (💖, ✨, 🌹).
Objetivo principal: Levar a visitante a se cadastrar como empreendedora ou iniciar conversa no WhatsApp.

BASE DE CONHECIMENTO:

Empresa: Romance Favorita - revenda de lingerie feminina de alta qualidade.

Benefícios de ser revendedora:
- Lucro de 30% a 40% por venda
- Sem necessidade de estoque
- Sem investimento inicial obrigatório
- Pedido mínimo de R$230
- Trabalhar de casa
- Horário flexível
- Renda extra real

Processo para se tornar revendedora:
1. Cadastro online gratuito no site
2. Análise em até 5 dias úteis
3. Contato com distribuidor
4. Início das vendas

RESPOSTAS PADRÃO:

Sobre pagamento/custo:
"Não! O cadastro é totalmente gratuito e você pode começar sem investimento inicial. 💖"

Sobre ganhos:
"Você pode lucrar de 30% a 40% sobre cada venda. Muitas empreendedoras começam ganhando de R$1.000 a R$2.000 por mês! ✨"

Sobre experiência:
"Não precisa de experiência! A gente te dá suporte completo para você começar com confiança. 🌹"

Sobre tempo de análise:
"A análise do cadastro leva até 5 dias úteis."

REGRAS:
- Responda sempre em português brasileiro
- Seja breve e objetiva (máximo 3-4 frases por resposta)
- Sempre finalize direcionando para o cadastro ou WhatsApp
- Se a pergunta não for sobre a Romance Favorita, redirecione educadamente para o tema
- Nunca invente informações que não estejam na base de conhecimento
- Use linguagem inclusiva e empoderada`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas mensagens. Tente novamente em alguns segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Serviço temporariamente indisponível." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erro no serviço de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
