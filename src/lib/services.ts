export type PublicService = {
  id?: string;
  slug: string;
  name: string;
  badge: string | null;
  description: string;
  pricing_model: "fixed" | "starting_at" | "hourly" | "percentage" | "hybrid" | "custom";
  base_price: number | null;
  percentage_rate: number | null;
  price_label_override: string | null;
  price_note: string | null;
  features: string[];
  featured: boolean;
  sort_order: number;
};

export const fallbackPublicServices: PublicService[] = [
  {
    slug: "analise-inicial",
    name: "Análise inicial",
    badge: "Entrada",
    description: "Primeira leitura técnica para entender o produto, o problema e se há espaço para diagnóstico ou suporte.",
    pricing_model: "fixed",
    base_price: 129,
    percentage_rate: null,
    price_label_override: null,
    price_note: "Triagem paga, objetiva e sem venda de produto financeiro.",
    features: ["Leitura inicial do caso e dos documentos principais.", "Indicação do nível de complexidade e próximos passos possíveis.", "Sem recomendação de compra de novos ativos."],
    featured: true,
    sort_order: 10
  },
  {
    slug: "segunda-opiniao",
    name: "Revisão técnica",
    badge: "Segunda opinião",
    description: "Conversa e leitura crítica antes de assinar uma lâmina, aceitar uma proposta ou manter um produto complexo.",
    pricing_model: "hybrid",
    base_price: 300,
    percentage_rate: 0.1,
    price_label_override: null,
    price_note: "0,1% calculado sobre a carteira ou valor analisado no escopo combinado.",
    features: ["Checklist de riscos, custos e perguntas para banco ou corretora.", "Comparação educacional de cenários e premissas.", "Registro dos pontos que precisam de confirmação documental."],
    featured: false,
    sort_order: 20
  },
  {
    slug: "suporte-de-caso",
    name: "Suporte de caso",
    badge: "Caso assistido",
    description: "Acompanhamento operacional em FGC, negociação, documentação ou recuperação de valor.",
    pricing_model: "custom",
    base_price: null,
    percentage_rate: null,
    price_label_override: null,
    price_note: "Valor variável conforme urgência, documentação, instituição e objetivo.",
    features: ["Organização de documentos e linha do tempo.", "Apoio técnico para conversas com instituições.", "Integração com advogado quando necessário."],
    featured: false,
    sort_order: 30
  }
];

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const percent = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 });

export function formatServicePrice(service: Pick<PublicService, "pricing_model" | "base_price" | "percentage_rate" | "price_label_override">) {
  if (service.price_label_override) return service.price_label_override;
  const base = service.base_price == null ? null : brl.format(Number(service.base_price));
  const rate = service.percentage_rate == null ? null : `${percent.format(Number(service.percentage_rate))}%`;
  if (service.pricing_model === "custom") return "Sob análise";
  if (service.pricing_model === "percentage") return rate || "Variável";
  if (service.pricing_model === "hybrid") return [base, rate].filter(Boolean).join(" + ") || "Sob análise";
  if (service.pricing_model === "starting_at") return base ? `A partir de ${base}` : "Sob análise";
  if (service.pricing_model === "hourly") return base ? `${base} / hora` : "Sob análise";
  return base || "Sob análise";
}

export function slugifyServiceName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
}
