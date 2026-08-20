import type { Metadata } from "next";
import LeadForm from "@/components/landing/LeadForm";
import Method from "@/components/landing/Method";
import SiteFrame from "@/components/landing/SiteFrame";

export const metadata: Metadata = {
  title: "Como funciona | Íntegra Consultoria",
  description: "Conheça o processo de análise técnica e independente da Íntegra.",
};

export default function MethodPage() {
  return <SiteFrame><Method /><LeadForm /></SiteFrame>;
}
