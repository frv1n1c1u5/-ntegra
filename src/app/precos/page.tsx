import type { Metadata } from "next";
import LeadForm from "@/components/landing/LeadForm";
import Pricing from "@/components/landing/Pricing";
import SiteFrame from "@/components/landing/SiteFrame";
import PageIntro from "@/components/landing/PageIntro";

export const metadata: Metadata = {
  title: "Preços | Íntegra Consultoria",
  description: "Valores e escopos de análise da Íntegra Consultoria.",
  alternates: { canonical: "/precos" },
};

export default function PricesPage() {
  return <SiteFrame><PageIntro eyebrow="Preços" title="Comece com um escopo claro, não com uma promessa vaga." copy="O Dossiê Expresso custa R$ 229 e é entregue em até 48h. Casos que pedem outro escopo são apresentados antes de qualquer avanço." /><Pricing /><LeadForm /></SiteFrame>;
}
