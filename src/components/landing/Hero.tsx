"use client";

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
          <figure className="editorial-hero-art" aria-hidden="true">
            <div className="hero-card">
              <div className="hero-card-head">
                <span className="hero-card-badge">Dossiê Expresso</span>
                <span className="hero-card-status"><span className="pulse" /> em análise · 48h</span>
              </div>
              <p className="hero-card-title">COE — CDC Rendimento Alto</p>
              <div className="hero-card-rows">
                <div className="hero-card-row"><span>Riscos mapeados</span><strong>7 itens</strong></div>
                <div className="hero-card-row"><span>Custos implícitos</span><strong>R$ 1.240</strong></div>
                <div className="hero-card-row"><span>Liquidez</span><strong>resgate em 2 anos</strong></div>
                <div className="hero-card-row"><span>Incentivo comercial</span><strong>avaliado</strong></div>
              </div>
              <div className="hero-card-foot">
                <div><span>Análise independente</span><strong className="hero-card-price">R$ 229</strong></div>
                <span className="hero-card-chip">Sem comissão</span>
              </div>
            </div>
            <span className="hero-card-float">entrega em 48h</span>
          </figure>
        </div>
      </div>
    </section>
  );
}
