"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import { qualifiedWhatsAppUrl } from "@/lib/contact";

export default function Hero() {
  return (
    <section id="top" className="editorial-hero">
      <div className="shell">
        <div className="editorial-hero-grid">
          <div className="editorial-hero-copy">
            <p className="editorial-kicker"><ShieldCheck size={14} aria-hidden="true" /> Análise independente · sem comissão</p>
            <h1>Antes de decidir, enxergue o que o produto não contou.</h1>
            <p>O Dossiê Expresso traduz riscos, custos, liquidez e conflitos de interesse em uma leitura objetiva — sem venda de produto, sem rebate e sem pressão comercial.</p>
            <div className="editorial-hero-actions">
              <a className="editorial-cta" href={qualifiedWhatsAppUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_cta", { placement: "hero" })}>
                <MessageCircle size={18} aria-hidden="true" />Iniciar no WhatsApp
              </a>
              <Link className="editorial-quiet-link" href="#dossie">Ver o que está incluído <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className="hero-facts">
              <span><strong>R$ 229</strong> pagamento único</span>
              <span><strong>até 48h</strong> para a entrega</span>
              <span><strong>sem comissão</strong> de instituições</span>
            </div>
          </div>
          <figure className="editorial-hero-art hero-art-frame" aria-label="Ilustração de um documento de vidro translúcido com camadas revelando análises financeiras destacadas em verde">
            <Image
              src="/images/landing/hero-glass_2.webp"
              alt="Documento de vidro translúcido com camadas revelando marcadores de análise financeira em verde — ilustração da clareza que o Dossiê Expresso entrega."
              width={1792}
              height={2400}
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="hero-art-img"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
