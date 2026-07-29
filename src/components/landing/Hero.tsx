"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LockKeyhole, MessageCircle, FileSearch, BadgeCheck, ReceiptText, TriangleAlert, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551999381379";

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const quickMessage = useMemo(
    () => buildWhatsAppUrl(
      "Olá, Íntegra. Quero entender se um produto financeiro que me ofereceram ou que já comprei tem riscos, custos ou conflitos que eu não estou enxergando."
    ),
    []
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.05 });

      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 })
        .fromTo(".hero-title-word", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.035 }, "-=0.2")
        .fromTo(".hero-copy", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .fromTo(".hero-actions", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, "-=0.28")
        .fromTo(".hero-proof-item", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 }, "-=0.2")
        .fromTo(".diagnostic-board", { opacity: 0, x: 36 }, { opacity: 1, x: 0, duration: 0.55 }, "-=0.75");

      gsap.to(".hero-monogram", {
        y: -120,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });

      gsap.to(".diagnostic-board", {
        y: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Raio-x", "financeiro", "para", "produtos", "que", "ninguém", "explicou", "direito."];

  return (
    <section ref={sectionRef} id="top" className="hero">
      <div className="hero-monogram" aria-hidden="true">Í</div>
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-eyebrow">
              <LockKeyhole size={16} aria-hidden="true" />
              Análise independente · sem comissão
            </div>
            <h1>
              {titleWords.map((word, i) => (
                <span key={i} className="hero-title-word" style={{ display: "inline-block", marginRight: "0.3em" }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="hero-copy hero-copy-anim">
              A Íntegra traduz COEs, operações estruturadas, FGC e possíveis conflitos de interesse em um diagnóstico objetivo, visual e acionável. Sem rebate. Sem venda de produto.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href={quickMessage} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                Analisar meu caso no WhatsApp
              </a>
              <a className="button button-secondary" href="#exemplo-diagnostico">
                <FileSearch size={18} aria-hidden="true" />
                Ver exemplo de diagnóstico
              </a>
            </div>
            <div className="hero-proof">
              {[
                { strong: "R$ 129,00", span: "Análise inicial para entender se há caso e qual caminho seguir." },
                { strong: "Sem call", span: "Não recomendamos compra de novos ativos no modelo inicial." },
                { strong: "Com método", span: "Premissas, cenários, documentos e perguntas de negociação." },
              ].map((item, i) => (
                <div key={i} className="proof-item hero-proof-item">
                  <strong>{item.strong}</strong>
                  <span>{item.span}</span>
                </div>
              ))}
            </div>
          </div>

          <aside id="exemplo-diagnostico" className="diagnostic-board" aria-label="Exemplo de mapa de diagnóstico">
            <div className="board-top">
              <span className="board-title">Dossiê Íntegra</span>
              <span className="board-status">
                <BadgeCheck size={16} aria-hidden="true" />
                Independente
              </span>
            </div>
            <div className="board-metric">
              <span>Primeira leitura</span>
              <strong>R$ 129,00</strong>
              <small>triagem técnica do caso</small>
            </div>
            <div className="board-body">
              {[
                { icon: ReceiptText, title: "Produto e contrato", desc: "Lâmina, nota, vencimento, emissor e indexadores.", tag: "Base documental" },
                { icon: TriangleAlert, title: "Riscos escondidos", desc: "Liquidez, barreiras, derivativos, marcação e custos implícitos.", tag: "Leitura crítica" },
                { icon: Handshake, title: "Conflito aparente", desc: "Incentivos comerciais e aderência ao perfil declarado.", tag: "Perguntas certas" },
              ].map((row, i) => (
                <div key={i} className="scan-row">
                  <span className="scan-icon"><row.icon size={19} aria-hidden="true" /></span>
                  <span><strong>{row.title}</strong><span>{row.desc}</span></span>
                  <span className="scan-tag">{row.tag}</span>
                </div>
              ))}
              <div className="board-note">
                A decisão final permanece com o investidor. A Íntegra entrega análise técnica, cenários e suporte operacional.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
