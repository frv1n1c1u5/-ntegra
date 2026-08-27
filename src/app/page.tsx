import { Metadata } from "next";
import LandingPage from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Dossiê Expresso: clareza antes da decisão",
  description: "Uma análise independente de produtos financeiros complexos: R$ 229, entrega em até 48h, sem comissão de instituições.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <LandingPage />;
}
