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
    name: "Dossiê Expresso",
    badge: "Entrega inicial",
    description: "Uma leitura independente e objetiva para mapear riscos, custos, liquidez e perguntas antes da próxima decisão.",
    pricing_model: "fixed",
    base_price: 229,
    percentage_rate: null,
    price_label_override: null,
    price_note: "Pagamento único · entrega em até 48h após as informações necessárias.",
    features: ["Leitura do material disponível e dos pontos centrais do caso.", "Mapa de riscos, custos, liquidez e pontos de atenção.", "Perguntas objetivas para levar à instituição ou ao assessor."],
    featured: true,
    sort_order: 10
  },
  {
    slug: "segunda-opiniao",
    name: "Análise ampliada",
    badge: "Sob proposta",
    description: "Escopo adicional para casos que, depois do Dossiê Expresso, exigem mais documentos, cenários ou profundidade técnica.",
    pricing_model: "custom",
    base_price: null,
    percentage_rate: null,
    price_label_override: null,
    price_note: "Escopo e valor apresentados antes de qualquer avanço.",
    features: ["Definido somente após entender o caso e os documentos.", "Sem percentual sobre patrimônio ou produto distribuído.", "Sem recomendação personalizada de compra ou venda."],
    featured: false,
    sort_order: 20
  },
  {
    slug: "suporte-de-caso",
    name: "Apoio técnico de caso",
    badge: "Sob proposta",
    description: "Apoio técnico posterior para casos específicos que peçam organização documental ou interlocução orientada.",
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
