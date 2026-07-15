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
      gsap.fromTo(".faq-head", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".faq-head", start: "top 85%", once: true } });
      gsap.fromTo(".faq-item", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".faq-grid", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ padding: "104px 0", background: "var(--wash)" }}>
      <div className="shell">
        <div className="faq-head section-head"><div><p className="section-kicker">FAQ regulatório</p><h2 className="section-title">Limites claros desde a primeira conversa.</h2></div></div>
        <div className="faq-grid grid gap-3.5" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <article key={i} className="faq-item border border-[var(--line)] rounded-[var(--radius)] bg-white transition-all duration-200 hover:border-[rgba(7,155,130,0.3)] hover:shadow-[0_12px_30px_rgba(4,16,12,0.07)]" style={{ boxShadow: "var(--shadow)" }}>
                <button className="w-full text-left p-6 flex items-start justify-between gap-4" onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen}>
                  <h3 className="m-0 text-[18px] font-bold" style={{ color: "var(--ink)" }}>{faq.q}</h3>
                  <ChevronDown size={20} className="flex-shrink-0 mt-1 transition-transform duration-300" style={{ color: "var(--accent-dark)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} aria-hidden="true" />
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}><p className="m-0 px-6 pb-6 text-[var(--muted-color)] leading-[1.6]">{faq.a}</p></div>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:660px){.faq-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
