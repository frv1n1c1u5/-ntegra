"use client";

import { MessageCircle } from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import { qualifiedWhatsAppUrl } from "@/lib/contact";

export default function FinalCTA() {
  return (
    <section id="contato" className="editorial-final-cta" aria-labelledby="final-cta-title">
      <div className="shell final-cta-grid">
        <p className="final-cta-index">Í / 48H</p>
        <div><p className="editorial-kicker">O próximo passo é simples</p><h2 id="final-cta-title">Se o produto precisa de mais clareza, comece por uma conversa curta.</h2></div>
        <div className="final-cta-action"><p>Dossiê Expresso<br /><strong>R$ 229 · até 48h</strong></p><a href={qualifiedWhatsAppUrl} target="_blank" rel="noreferrer" className="editorial-cta" onClick={() => trackConversion("whatsapp_cta", { placement: "final" })}><MessageCircle size={18} aria-hidden="true" />Falar no WhatsApp</a></div>
      </div>
    </section>
  );
}
