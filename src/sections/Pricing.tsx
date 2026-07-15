import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  { label: "Entrada", title: "Análise inicial", subtitle: "Primeira leitura técnica para entender o produto, o problema e se há espaço para diagnóstico ou suporte.", price: "R$ 129,00", featured: false, features: ["Triagem paga, objetiva e sem venda de produto financeiro.", "Leitura inicial do caso e dos documentos principais.", "Indicação do nível de complexidade e próximos passos possíveis.", "Sem recomendação de compra de novos ativos."] },
  { label: "Segunda opinião", title: "Revisão técnica", subtitle: "Conversa e leitura crítica antes de assinar uma lâmina, aceitar uma proposta ou manter um produto complexo.", price: "R$ 300,00 + 0,1%", featured: true, features: ["0,1% calculado sobre a carteira ou valor analisado no escopo combinado.", "Checklist de riscos, custos e perguntas para banco ou corretora.", "Comparação educacional de cenários e premissas.", "Registro dos pontos que precisam de confirmação documental."] },
  { label: "Caso assistido", title: "Suporte de caso", subtitle: "Acompanhamento operacional em FGC, negociação, documentação ou recuperação de valor.", price: "Sob análise", featured: false, features: ["Valor variável conforme urgência, documentação, instituição e objetivo.", "Organização de documentos e linha do tempo.", "Apoio técnico para conversas com instituições.", "Integração com advogado quando necessário."] },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pricing-head", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".pricing-head", start: "top 85%", once: true } });
      gsap.fromTo(".pricing-card", { opacity: 0, y: 50, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".pricing-grid", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="precos" className="relative" style={{ padding: "104px 0", background: "var(--wash)" }}>
      <div className="shell">
        <div className="pricing-head section-head">
          <div><p className="section-kicker">Preços</p><h2 className="section-title">Começo simples, cobrança proporcional quando o caso exige mais profundidade.</h2></div>
          <p className="section-copy">A análise inicial serve para qualificar o problema. Suporte posterior depende de volume de documentos, urgência, tipo de instituição e objetivo do cliente.</p>
        </div>
        <div className="pricing-grid grid gap-4" style={{ gridTemplateColumns: "1.08fr 0.96fr 0.96fr" }}>
          {plans.map((plan, i) => (
            <article key={plan.label} className="pricing-card relative flex flex-col overflow-hidden rounded-[var(--radius)] transition-all duration-300" style={{ minHeight: "470px", padding: "27px", border: "1px solid var(--line)", background: plan.featured ? "var(--deep)" : "#fff", color: plan.featured ? "#fff" : "var(--ink)", boxShadow: hoveredIndex === i ? "0 30px 70px rgba(4,16,12,0.15)" : "var(--shadow)", transform: hoveredIndex === i ? "translateY(-6px)" : "translateY(0)" }} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(90deg, var(--accent), var(--gold))" }} />
              <span className="inline-flex w-fit mb-7 border rounded-full px-2.5 py-[7px] text-[11px] font-extrabold uppercase" style={{ borderColor: plan.featured ? "rgba(255,255,255,0.18)" : "var(--line)", color: plan.featured ? "#f4e8ca" : "var(--accent-dark)" }}>{plan.label}</span>
              <h3 className="m-0 text-[22px] font-bold">{plan.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.55]" style={{ color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--muted-color)" }}>{plan.subtitle}</p>
              <div className="my-6 font-extrabold leading-none" style={{ fontSize: plan.price === "Sob análise" ? "clamp(30px, 3vw, 40px)" : "clamp(34px, 3.7vw, 48px)" }}>{plan.price}</div>
              <ul className="grid gap-2.5 mt-auto pt-7 list-none m-0 p-0 border-t border-[var(--line)]">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="relative pl-[18px] text-[14px] leading-[1.48]" style={{ color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--muted-color)" }}><span className="absolute left-0 top-0" style={{ color: "var(--accent)" }}>•</span>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:940px){.pricing-grid{grid-template-columns:1fr!important}.pricing-card{min-height:auto!important}}`}</style>
    </section>
  );
}
