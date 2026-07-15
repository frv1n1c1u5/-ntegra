"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DynamicPricingGrid } from "./dynamic-pricing";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pricing-head", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".pricing-head", start: "top 85%", once: true },
      });
      gsap.fromTo(".pricing-card", { opacity: 0, y: 50, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".pricing-grid", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="precos" className="section section-muted">
      <div className="shell">
        <div className="section-head pricing-head">
          <div>
            <p className="section-kicker">Preços</p>
            <h2 className="section-title">Começo simples, cobrança proporcional quando o caso exige mais profundidade.</h2>
          </div>
          <p className="section-copy">
            A análise inicial serve para qualificar o problema. Suporte posterior depende de volume de documentos, urgência, tipo de instituição e objetivo do cliente.
          </p>
        </div>
        <DynamicPricingGrid />
      </div>
    </section>
  );
}
