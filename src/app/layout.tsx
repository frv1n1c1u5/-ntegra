import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Íntegra Consultoria | Auditoria independente de produtos financeiros",
  description:
    "Diagnóstico independente para investidores que querem entender COEs, produtos estruturados, FGC, custos e possíveis conflitos de interesse.",
  metadataBase: new URL("https://integraconsultoria.com.br"),
  openGraph: {
    title: "Íntegra Consultoria",
    description:
      "Auditoria técnica e independente para transformar produtos financeiros complexos em decisões claras.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
