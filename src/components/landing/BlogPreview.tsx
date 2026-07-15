"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contents = [
  { title: "COE sem mistério", copy: "O que olhar antes de aceitar uma estrutura: barreiras, indexadores, liquidez, cenários e custo de oportunidade." },
  { title: "FGC na prática", copy: "Quais documentos separar, como interpretar limites e por que o prazo emocional costuma ser diferente do prazo operacional." },
  { title: "Rebate e incentivo", copy: "Como comissões e metas comerciais podem distorcer a recomendação apresentada ao investidor." },
];

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-head", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-head", start: "top 85%", once: true },
      });
      gsap.fromTo(".content-card", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".content-grid", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog-preview" className="section">
      <div className="shell">
        <div className="section-head blog-head">
          <div>
            <p className="section-kicker">Escudo do Investidor</p>
            <h2 className="section-title">Um blog para investir com mais defesa e menos ruído.</h2>
          </div>
          <p className="section-copy">
            Artigos curtos e diretos sobre COE, FGC, conflito de interesse, rebate e produtos financeiros difíceis de entender.
          </p>
        </div>
        <div className="content-grid">
          {contents.map((content) => (
            <article key={content.title} className="content-card">
              <h3>{content.title}</h3>
              <p>{content.copy}</p>
              <a href="#triagem">
                Quero analisar meu caso
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
