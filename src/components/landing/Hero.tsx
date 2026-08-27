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
            <p className="editorial-kicker"><ShieldCheck size={15} aria-hidden="true" /> Análise independente · sem comissão</p>
            <h1>Antes de decidir, enxergue o que o produto não contou.</h1>
            <p>O Dossiê Expresso traduz riscos, custos, liquidez e conflitos de interesse em uma leitura objetiva — sem venda de produto, sem rebate e sem pressão comercial.</p>
            <div className="editorial-hero-actions"><a className="editorial-cta" href={qualifiedWhatsAppUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_cta", { placement: "hero" })}><MessageCircle size={18} aria-hidden="true" />Iniciar no WhatsApp</a><Link className="editorial-quiet-link" href="#dossie">Ver o que está incluído <ArrowRight size={16} aria-hidden="true" /></Link></div>
            <div className="hero-facts"><span><strong>R$ 229</strong> pagamento único</span><span><strong>até 48h</strong> para a entrega</span><span><strong>sem comissão</strong> de instituições</span></div>
          </div>
          <figure className="editorial-hero-art"><Image src="/images/landing/integra-dossie-editorial.png" alt="Composição editorial abstrata de um dossiê financeiro" priority sizes="(max-width: 900px) 100vw, 52vw" fill /></figure>
        </div>
      </div>
    </section>
  );
}
