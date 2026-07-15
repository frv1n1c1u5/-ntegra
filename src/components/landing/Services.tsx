"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileSearch, ShieldCheck, Scale } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: FileSearch, title: "Auditoria de carteira", copy: "Leitura técnica de COEs, estruturas, prazos, custos implícitos, liquidez e cenários de manutenção ou saída." },
  { icon: ShieldCheck, title: "Apoio em FGC", copy: "Organização de documentos, conferência de limites e suporte operacional para reduzir ansiedade e retrabalho." },
  { icon: Scale, title: "Conflito de interesse", copy: "Avaliação de indícios de incentivo comercial, rebate e desalinhamento entre produto oferecido e necessidade do investidor." },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-head", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".services-head", start: "top 85%", once: true },
      });
      gsap.fromTo(".service-card", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="dores" className="section">
      <div className="shell">
        <div className="section-head services-head">
          <div>
            <p className="section-kicker">As dores que curamos</p>
            <h2 className="section-title">
              Para quem recebeu uma explicação bonita, mas ainda não entendeu o risco.
            </h2>
          </div>
          <p className="section-copy">
            O foco é separar informação técnica de pressão comercial, sem substituir advogado, contador ou consultor CVM quando o caso exigir.
          </p>
        </div>
        <div className="cards-3 services-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="service-card">
                <span className="card-icon" style={{ marginBottom: 54 }}><Icon size={21} aria-hidden="true" /></span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
