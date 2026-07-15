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
      gsap.fromTo(".blog-head", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".blog-head", start: "top 85%", once: true } });
      gsap.fromTo(".content-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".content-grid", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog-preview" className="relative" style={{ padding: "104px 0" }}>
      <div className="shell">
        <div className="blog-head section-head">
          <div><p className="section-kicker">Escudo do Investidor</p><h2 className="section-title">Um blog para investir com mais defesa e menos ruído.</h2></div>
          <p className="section-copy">Artigos curtos e diretos sobre COE, FGC, conflito de interesse, rebate e produtos financeiros difíceis de entender.</p>
        </div>
        <div className="content-grid grid gap-4" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          {contents.map((content) => (
            <article key={content.title} className="content-card relative flex flex-col border border-[var(--line)] rounded-[var(--radius)] bg-white transition-all duration-200 hover:border-[rgba(7,155,130,0.3)] hover:shadow-[0_26px_62px_rgba(4,16,12,0.1)] hover:-translate-y-1" style={{ minHeight: "290px", padding: "26px", boxShadow: "var(--shadow)" }}>
              <div className="absolute top-6 left-[26px] w-[52px] h-[3px]" style={{ background: "linear-gradient(90deg, var(--accent), var(--gold))" }} />
              <h3 className="mt-[52px] mb-3 text-[22px] font-bold" style={{ color: "var(--ink)", fontFamily: "Georgia, serif" }}>{content.title}</h3>
              <p className="m-0 text-[var(--muted-color)] leading-[1.62]">{content.copy}</p>
              <a href="#triagem" className="inline-flex items-center gap-2 mt-auto pt-6 text-[var(--accent-dark)] font-bold text-[14px]">Quero analisar meu caso<ArrowRight size={17} aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:940px){.content-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
