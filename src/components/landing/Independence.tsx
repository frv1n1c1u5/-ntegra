"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { title: "Não distribuímos produtos financeiros.", desc: "A remuneração vem do cliente, por análise, segunda opinião ou suporte em casos específicos." },
  { title: "Não assumimos decisão de investimento.", desc: "O trabalho mostra cenários, premissas e impactos; a decisão final continua com o cliente." },
  { title: "Não conduzimos litígio jurídico.", desc: "Quando há disputa formal, atuamos como apoio técnico ao cliente e ao advogado parceiro." },
];

export default function Independence() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".independence-left", { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".independence-left", start: "top 85%", once: true },
      });
      gsap.fromTo(".principle", { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".principles", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="shell">
        <div className="split">
          <div className="independence-left">
            <p className="section-kicker">Independência</p>
            <h2 className="section-title">A autoridade vem justamente do que a Íntegra não vende.</h2>
          </div>
          <div className="principles">
            {principles.map((p, i) => (
              <div key={i} className="principle">
                <CheckCircle2 size={22} aria-hidden="true" />
                <span>
                  <strong>{p.title}</strong>
                  <span>{p.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
