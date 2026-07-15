import { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Íntegra Consultoria | Auditoria independente de produtos financeiros",
  description: "A Íntegra traduz COEs, operações estruturadas, FGC e possíveis conflitos de interesse em um diagnóstico objetivo, visual e acionável. Sem rebate. Sem venda de produto.",
};

export default function Home() {
  return <LandingPage />;
}
