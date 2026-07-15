import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LockKeyhole, MessageCircle, ClipboardCheck, BadgeCheck, ReceiptText, TriangleAlert, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5551999381379";

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const quickMessage = useMemo(() => buildWhatsAppUrl(
    "Olá, Íntegra. Quero entender se um produto financeiro que me ofereceram ou que já comprei tem riscos, custos ou conflitos que eu não estou enxergando."
  ), []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-title-word", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.3")
        .fromTo(".hero-copy", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-proof-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .fromTo(".diagnostic-board", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.2 }, "-=1");

      gsap.to(".hero-monogram", { y: -120, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 } });
      gsap.to(".diagnostic-board", { y: -8, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const titleWords = ["Raio-x", "financeiro", "para", "produtos", "que", "ninguém", "explicou", "direito."];

  return (
    <section ref={sectionRef} id="top" className="relative isolate grid items-center overflow-hidden" style={{ minHeight: "calc(100svh - 76px)", padding: "76px 0 64px", background: "linear-gradient(120deg, #edf3f0, #fff 75%)" }}>
      <div className="absolute inset-0 -z-10" style={{ background: "var(--deep)", clipPath: "polygon(0 0, 51% 0, 35% 100%, 0 100%)" }} />
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(90deg, #000 0 46%, transparent 67%)" }} />
      <div className="hero-monogram absolute -z-10 text-[rgba(255,244,220,0.055)] font-bold leading-[0.8]" style={{ left: "max(12px, calc((100vw - 1180px) / 2 - 30px))", bottom: "-120px", fontSize: "clamp(300px, 38vw, 590px)", fontFamily: "Georgia, serif" }} aria-hidden="true">Í</div>

      <div className="shell">
        <div className="grid gap-[clamp(36px,6vw,88px)] items-center justify-between" style={{ gridTemplateColumns: "minmax(440px, 570px) minmax(410px, 520px)" }}>
          <div className="relative z-[2]">
            <div className="hero-eyebrow inline-flex items-center gap-2 mb-5 text-[12px] font-extrabold uppercase opacity-0" style={{ color: "var(--mint)" }}>
              <LockKeyhole size={16} aria-hidden="true" />Independente, técnico e sem comissão de produto
            </div>
            <h1 className="max-w-[670px] m-0 font-extrabold leading-[0.91]" style={{ fontSize: "clamp(54px, 6.1vw, 88px)", color: "#fff", mixBlendMode: "difference", textShadow: "0 2px 22px rgba(4,16,12,0.18)" }}>
              {titleWords.map((word, i) => <span key={i} className="hero-title-word inline-block mr-[0.3em] opacity-0">{word}</span>)}
            </h1>
            <p className="hero-copy max-w-[530px] mt-7 text-[clamp(17px,1.45vw,20px)] leading-[1.55] opacity-0" style={{ color: "rgba(255,255,255,0.76)", textShadow: "0 1px 3px rgba(4,16,12,0.72)" }}>
              A Íntegra traduz COEs, operações estruturadas, FGC e possíveis conflitos de interesse em um diagnóstico objetivo, visual e acionável. Sem rebate. Sem venda de produto.
            </p>
            <div className="hero-actions flex flex-wrap gap-3 mt-8 opacity-0">
              <a className="button button-accent" href={quickMessage} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" />Começar pelo WhatsApp</a>
              <a className="button button-secondary" href="#triagem"><ClipboardCheck size={18} aria-hidden="true" />Preencher triagem</a>
            </div>
            <div className="hero-proof grid max-w-[540px] gap-[18px] mt-11" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
              {[{ s: "R$ 129,00", t: "Análise inicial para entender se há caso." }, { s: "Sem call", t: "Não recomendamos compra de novos ativos." }, { s: "Com método", t: "Premissas, cenários e perguntas de negociação." }].map((item, i) => (
                <div key={i} className="hero-proof-item border-t border-[rgba(255,255,255,0.2)] pt-4 transition-all duration-200 hover:border-[var(--mint)] hover:-translate-y-1 opacity-0">
                  <strong className="block mb-2 text-white text-[16px]">{item.s}</strong>
                  <span className="text-[12px] leading-[1.45]" style={{ color: "rgba(255,255,255,0.66)" }}>{item.t}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="diagnostic-board relative z-[3] overflow-hidden rounded-[var(--radius)] opacity-0" style={{ border: "1px solid rgba(4,16,12,0.12)", background: "rgba(255,255,255,0.97)", boxShadow: "0 34px 90px rgba(4,16,12,0.19)" }} aria-label="Exemplo de mapa de diagnóstico">
            <div className="absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(90deg, var(--accent), var(--gold))" }} />
            <div className="relative z-[1] flex items-center justify-between border-b border-[var(--line)] px-5 py-5">
              <span className="text-[13px] font-extrabold uppercase">Dossiê Íntegra</span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold" style={{ color: "var(--accent-dark)" }}><BadgeCheck size={16} aria-hidden="true" />Independente</span>
            </div>
            <div className="relative z-[1] mx-[18px] mt-[18px] rounded-[var(--radius)] text-white" style={{ background: "var(--deep)", padding: "22px" }}>
              <span className="block text-[12px]" style={{ color: "rgba(255,255,255,0.66)" }}>Primeira leitura</span>
              <strong className="block my-1.5 leading-none" style={{ color: "#f4e8ca", fontSize: "clamp(38px, 4vw, 54px)" }}>R$ 129,00</strong>
              <small className="block text-[12px]" style={{ color: "rgba(255,255,255,0.66)" }}>triagem técnica do caso</small>
            </div>
            <div className="relative z-[1] grid gap-3 p-[18px]">
              {[{ icon: ReceiptText, title: "Produto e contrato", desc: "Lâmina, nota, vencimento, emissor e indexadores.", tag: "Base documental" }, { icon: TriangleAlert, title: "Riscos escondidos", desc: "Liquidez, barreiras, derivativos, marcação e custos.", tag: "Leitura crítica" }, { icon: Handshake, title: "Conflito aparente", desc: "Incentivos comerciais e aderência ao perfil.", tag: "Perguntas certas" }].map((row, i) => (
                <div key={i} className="grid gap-3 items-center border border-[var(--line)] rounded-[var(--radius)] bg-white p-[13px] transition-all duration-200 hover:border-[rgba(7,155,130,0.35)] hover:shadow-[0_12px_25px_rgba(4,16,12,0.07)] hover:translate-x-1" style={{ gridTemplateColumns: "38px 1fr auto" }}>
                  <span className="card-icon"><row.icon size={19} aria-hidden="true" /></span>
                  <span><strong className="block mb-1 text-[14px]">{row.title}</strong><span className="text-[11px] text-[var(--muted-color)]">{row.desc}</span></span>
                  <span className="text-[11px] whitespace-nowrap border border-[var(--line)] rounded-full px-2 py-1.5">{row.tag}</span>
                </div>
              ))}
              <div className="border rounded-[var(--radius)] p-[13px] text-[12px] leading-[1.45]" style={{ borderColor: "rgba(200,164,93,0.38)", background: "#fff6df", color: "#655021" }}>
                A decisão final permanece com o investidor. A Íntegra entrega análise técnica, cenários e suporte operacional.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
