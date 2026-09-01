"use client";

import { useEffect, useRef } from "react";

export default function AnalysisShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const v = videoRef.current;
      if (!v) return;
      if (media.matches) {
        v.pause();
        v.removeAttribute("autoplay");
      } else {
        v.setAttribute("autoplay", "");
        v.play().catch(() => { /* poster permanece como fallback */ });
      }
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <section className="editorial-section showcase-section" aria-labelledby="showcase-title">
      <div className="shell showcase-shell">
        <p className="editorial-kicker">A leitura em movimento</p>
        <h2 id="showcase-title">Quando as camadas se abrem, o que importa fica visível.</h2>
        <p className="showcase-copy">Riscos, custos, liquidez e incentivos comerciais: cada elemento do produto é separado e posto à vista, em uma linguagem direta.</p>
        <figure className="showcase-frame" aria-label="Prévia animada da análise do Dossiê Expresso: um documento de vidro translúcido cujas camadas se separam revelando marcadores de risco, custos e liquidez em verde.">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/landing/hero-glass_2.webp"
            aria-hidden="true"
          >
            <source src="/images/landing/glass_video.mp4" type='video/mp4; codecs="hvc1.1.6.L93.B0"' />
          </video>
        </figure>
        <p className="showcase-caption">Prévia ilustrativa — o Dossiê Expresso é entregue como documento escrito, no formato que você leva para a próxima conversa.</p>
      </div>
    </section>
  );
}
