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
      gsap.fromTo(".method-head", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".method-head", start: "top 85%", once: true } });
      gsap.fromTo(".step-item", { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".steps-grid", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="metodo" className="relative" style={{ padding: "104px 0", background: "var(--wash)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(7,21,16,0.035) 1px, transparent 1px)", backgroundSize: "100% 64px" }} />
      <div className="shell relative">
        <div className="method-head section-head">
          <div><p className="section-kicker">Como funciona</p><h2 className="section-title">Um processo curto para transformar ruído em plano de ação.</h2></div>
          <p className="section-copy">Você começa com uma análise inicial acessível. Se fizer sentido avançar, o escopo cresce conforme a carteira e a complexidade.</p>
        </div>
        <div className="steps-grid grid border border-[var(--line)] rounded-[var(--radius)] bg-white overflow-hidden" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", boxShadow: "var(--shadow)" }}>
          {steps.map(([title, copy], index) => (
            <article key={title} className="step-item relative min-h-[270px] p-[26px] transition-all duration-200 hover:bg-[#f8fbfa] hover:-translate-y-1" style={{ borderRight: index < steps.length - 1 ? "1px solid var(--line)" : "none" }}>
              <span className="block text-[30px] font-semibold leading-none mb-[58px]" style={{ color: "var(--accent-dark)", fontFamily: "Georgia, serif" }}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className="m-0 mb-3 text-[21px] font-bold" style={{ color: "var(--ink)" }}>{title}</h3>
              <p className="m-0 text-[var(--muted-color)] leading-[1.58]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:940px){.steps-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.step-item:nth-child(2){border-right:none!important}}@media(max-width:660px){.steps-grid{grid-template-columns:1fr!important}.step-item{border-right:none!important;border-bottom:1px solid var(--line)}}`}</style>
    </section>
  );
}
