"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contents = [
  { title: "COE: 9 perguntas antes de assinar", copy: "Proteção, barreiras, liquidez, cenários e remuneração: o checklist que transforma a promessa em critérios.", href: "/blog/coe-perguntas-antes-de-assinar" },
  { title: "FGC sem confusão", copy: "Como funcionam o limite por conglomerado, o teto de quatro anos e a cobertura dos principais produtos.", href: "/blog/fgc-limites-conglomerado-quatro-anos" },
  { title: "Rebate e comissão", copy: "Onde encontrar quanto o intermediário recebeu e como avaliar o incentivo por trás de uma recomendação.", href: "/blog/rebate-comissao-intermediario" },
];

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-head", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.45, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-head", start: "top 85%", once: true },
      });
      gsap.fromTo(".content-card", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out",
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
              <Link href={content.href}>
                Ler no Escudo do Investidor
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
