import type { Metadata } from "next";
import Independence from "@/components/landing/Independence";
import LeadForm from "@/components/landing/LeadForm";
import Services from "@/components/landing/Services";
import SiteFrame from "@/components/landing/SiteFrame";

export const metadata: Metadata = {
  title: "Soluções | Íntegra Consultoria",
  description: "Análise independente para produtos financeiros complexos, FGC e conflitos de interesse.",
};

export default function SolutionsPage() {
  return <SiteFrame><Services /><Independence /><LeadForm /></SiteFrame>;
}
