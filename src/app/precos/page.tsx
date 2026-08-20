import type { Metadata } from "next";
import LeadForm from "@/components/landing/LeadForm";
import Pricing from "@/components/landing/Pricing";
import SiteFrame from "@/components/landing/SiteFrame";

export const metadata: Metadata = {
  title: "Preços | Íntegra Consultoria",
  description: "Valores e escopos de análise da Íntegra Consultoria.",
};

export default function PricesPage() {
  return <SiteFrame><Pricing /><LeadForm /></SiteFrame>;
}
