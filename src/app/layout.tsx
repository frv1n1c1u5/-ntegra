import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import CampaignAttribution from "@/components/landing/CampaignAttribution";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Íntegra | Dossiê Expresso para decisões financeiras", template: "%s | Íntegra" },
  description:
    "Diagnóstico independente para investidores que querem entender COEs, produtos estruturados, FGC, custos e possíveis conflitos de interesse.",
  metadataBase: new URL("https://integraconsultoria.com.br"),
  openGraph: {
    title: "Íntegra Consultoria",
    description:
      "Dossiê Expresso para entender produtos financeiros complexos com independência, por R$ 229 e entrega em até 48 horas.",
    type: "website",
    locale: "pt_BR"
  },
  twitter: { card: "summary_large_image", title: "Íntegra | Dossiê Expresso", description: "Clareza antes da decisão: R$ 229 e entrega em até 48h." }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}<CampaignAttribution /><Analytics /></body>
    </html>
  );
}
