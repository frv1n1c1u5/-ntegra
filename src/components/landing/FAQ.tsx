"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "A Íntegra recomenda onde investir depois?", a: "No modelo inicial, não. A atuação é diagnóstico, educação técnica, análise de custos, riscos, conflitos e suporte operacional." },
  { q: "Vocês substituem advogado?", a: "Não. Reclamações formais, indenização e litígio devem ser conduzidos por advogado. Podemos apoiar tecnicamente o caso." },
  { q: "Vocês recebem comissão de banco ou corretora?", a: "Não. O modelo comercial é fee pago pelo cliente e, em casos elegíveis, taxa de sucesso sobre valor recuperado ou economizado." },
  { q: "O relatório manda vender ou manter?", a: "O relatório apresenta cenários, premissas e consequências financeiras. A decisão final permanece com o investidor." },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-head", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".faq-head", start: "top 85%", once: true },
      });
      gsap.fromTo(".faq-item", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".faq-grid", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section section-muted">
      <div className="shell">
        <div className="section-head faq-head">
          <div>
            <p className="section-kicker">FAQ regulatório</p>
            <h2 className="section-title">Limites claros desde a primeira conversa.</h2>
          </div>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <article key={i} className="faq-item">
                <button onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen}>
                  <h3>{faq.q}</h3>
                  <ChevronDown size={20} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} aria-hidden="true" />
                </button>
                <div style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "all 0.3s" }}>
                  <p>{faq.a}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
