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
      gsap.fromTo(".independence-left", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".independence-left", start: "top 85%", once: true } });
      gsap.fromTo(".principle-item", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".principles-list", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ padding: "104px 0" }}>
      <div className="shell">
        <div className="grid items-start" style={{ gridTemplateColumns: "minmax(0, 0.82fr) minmax(360px, 1fr)", gap: "clamp(50px, 10vw, 140px)" }}>
          <div className="independence-left">
            <p className="section-kicker">Independência</p>
            <h2 className="section-title">A autoridade vem justamente do que a Íntegra não vende.</h2>
          </div>
          <div className="principles-list grid">
            {principles.map((p, i) => (
              <div key={i} className="principle-item grid gap-3.5 border-t border-[var(--line)] py-6 transition-transform duration-200 hover:translate-x-[5px]" style={{ gridTemplateColumns: "28px 1fr", borderBottom: i === principles.length - 1 ? "1px solid var(--line)" : "none" }}>
                <CheckCircle2 size={22} className="text-[var(--accent-dark)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong className="block mb-1.5" style={{ color: "var(--ink)" }}>{p.title}</strong><span className="text-[var(--muted-color)] leading-[1.52]">{p.desc}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:940px){.shell>div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
