"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ["Triagem", "Entendemos a instituição, produto, valor aproximado, urgência e documentos disponíveis."],
  ["Diagnóstico", "Mapeamos custos, riscos, liquidez, prazos, contraparte e pontos de conflito em linguagem clara."],
  ["Relatório", "Entregamos cenários objetivos, premissas e perguntas certas para negociar com banco ou corretora."],
  ["Suporte", "Apoiamos a execução operacional do próximo passo, sem assumir decisão de investimento pelo cliente."],
];

export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".method-head", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".method-head", start: "top 85%", once: true },
      });
      gsap.fromTo(".step", { opacity: 0, y: 40, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".steps", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="metodo" className="section section-muted">
      <div className="shell">
        <div className="section-head method-head">
          <div>
            <p className="section-kicker">Como funciona</p>
            <h2 className="section-title">Um processo curto para transformar ruído em plano de ação.</h2>
          </div>
          <p className="section-copy">
            Você começa com uma análise inicial acessível. Se fizer sentido avançar, o escopo cresce conforme a carteira e a complexidade.
          </p>
        </div>
        <div className="steps">
          {steps.map(([title, copy], index) => (
            <article key={title} className="step">
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
