import type { Metadata } from "next";
import Independence from "@/components/landing/Independence";
import LeadForm from "@/components/landing/LeadForm";
import Services from "@/components/landing/Services";
import SiteFrame from "@/components/landing/SiteFrame";
import PageIntro from "@/components/landing/PageIntro";

export const metadata: Metadata = {
  title: "Soluções | Íntegra Consultoria",
  description: "Análise independente para produtos financeiros complexos, FGC e conflitos de interesse.",
  alternates: { canonical: "/solucoes" },
};

export default function SolutionsPage() {
  return <SiteFrame><PageIntro eyebrow="Soluções" title="O problema precisa de uma leitura melhor antes de uma reação maior." copy="A Íntegra organiza cenários complexos sem distribuir produtos ou substituir aconselhamento jurídico quando ele é necessário." /><Services /><Independence /><LeadForm /></SiteFrame>;
}
