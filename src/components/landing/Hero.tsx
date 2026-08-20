"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, LockKeyhole, MessageCircle } from "lucide-react";
import { DynamicPrice } from "./dynamic-pricing";

gsap.registerPlugin(ScrollTrigger);

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551999381379";

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const quickMessage = useMemo(
    () => buildWhatsAppUrl(
      "Olá, Íntegra. Quero entender se um produto financeiro que me ofereceram ou que já comprei tem riscos, custos ou conflitos que eu não estou enxergando."
    ),
    []
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.05 });

      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 })
        .fromTo(".hero-title-word", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.035 }, "-=0.2")
        .fromTo(".hero-copy", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .fromTo(".hero-actions", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, "-=0.28")
        .fromTo(".hero-proof-item", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 }, "-=0.2");

      gsap.to(".hero-monogram", {
        y: -120,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Raio-x", "financeiro", "para", "produtos", "que", "ninguém", "explicou", "direito."];

  return (
    <section ref={sectionRef} id="top" className="hero">
      <div className="hero-monogram" aria-hidden="true">Í</div>
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow">
              <LockKeyhole size={16} aria-hidden="true" />
              Análise independente · sem comissão
            </div>
            <h1 className="hero-home-title">
              {titleWords.map((word, i) => (
                <span key={i} className="hero-title-word" style={{ display: "inline-block", marginRight: "0.3em" }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="hero-copy hero-copy-anim">
              Entenda os riscos, custos e conflitos de interesse antes de tomar a próxima decisão. Análise independente, sem rebate e sem venda de produto.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href={quickMessage} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                Analisar meu caso no WhatsApp
              </a>
              <a className="button button-secondary" href="/como-funciona">
                Como funciona
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-proof">
              {[
                { strong: <DynamicPrice />, span: "Análise inicial para entender seu caso e os próximos passos." },
                { strong: "Sem comissão", span: "Nenhum produto financeiro é vendido ou indicado pela Íntegra." },
                { strong: "Com clareza", span: "Você recebe perguntas e critérios para decidir melhor." },
              ].map((item, i) => (
                <div key={i} className="proof-item hero-proof-item">
                  <strong>{item.strong}</strong>
                  <span>{item.span}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
