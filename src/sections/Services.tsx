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
      gsap.fromTo(".services-head", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".services-head", start: "top 85%", once: true } });
      gsap.fromTo(".service-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".services-grid", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="dores" className="relative" style={{ padding: "104px 0" }}>
      <div className="shell">
        <div className="services-head section-head">
          <div><p className="section-kicker">As dores que curamos</p><h2 className="section-title">Para quem recebeu uma explicação bonita, mas ainda não entendeu o risco.</h2></div>
          <p className="section-copy">O foco é separar informação técnica de pressão comercial, sem substituir advogado, contador ou consultor CVM quando o caso exigir.</p>
        </div>
        <div className="services-grid grid gap-4" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="service-card relative overflow-hidden border border-[var(--line)] rounded-[var(--radius)] bg-white transition-all duration-200 hover:border-[rgba(7,155,130,0.3)] hover:shadow-[0_26px_62px_rgba(4,16,12,0.1)] hover:-translate-y-1" style={{ minHeight: "290px", padding: "26px", boxShadow: "var(--shadow)" }}>
                <span className="absolute right-5 top-[18px] text-[36px] font-semibold leading-none" style={{ color: "#dfe7e3", fontFamily: "Georgia, serif" }}>0{i + 1}</span>
                <span className="card-icon mb-[54px]"><Icon size={21} aria-hidden="true" /></span>
                <h3 className="m-0 mb-3 text-[22px] font-bold" style={{ color: "var(--ink)" }}>{service.title}</h3>
                <p className="m-0 text-[var(--muted-color)] leading-[1.62]">{service.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:940px){.services-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
