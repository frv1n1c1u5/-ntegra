import type { Metadata } from "next";
import LeadForm from "@/components/landing/LeadForm";
import Method from "@/components/landing/Method";
import SiteFrame from "@/components/landing/SiteFrame";
import PageIntro from "@/components/landing/PageIntro";

export const metadata: Metadata = {
  title: "Como funciona | Íntegra Consultoria",
  description: "Conheça o processo de análise técnica e independente da Íntegra.",
  alternates: { canonical: "/como-funciona" },
};

export default function MethodPage() {
  return <SiteFrame><PageIntro eyebrow="Método" title="A análise começa pela pergunta certa." copy="Contexto, leitura técnica e uma síntese objetiva para você conversar melhor com a instituição e decidir com mais clareza." /><Method /><LeadForm /></SiteFrame>;
}
