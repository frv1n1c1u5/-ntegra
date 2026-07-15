"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LockKeyhole, MessageCircle, ClipboardCheck, BadgeCheck, ReceiptText, TriangleAlert, Handshake } from "lucide-react";

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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-title-word", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.3")
        .fromTo(".hero-copy", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-proof-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .fromTo(".diagnostic-board", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.2 }, "-=1");

      gsap.to(".hero-monogram", {
        y: -120,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });

      gsap.to(".diagnostic-board", {
        y: -8,
        duration: 3,
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
            <div className="eyebrow hero-eyebrow" style={{ opacity: 0 }}>
              <LockKeyhole size={16} aria-hidden="true" />
              Independente, técnico e sem comissão de produto
            </div>
            <h1>
              {titleWords.map((word, i) => (
                <span key={i} className="hero-title-word" style={{ display: "inline-block", marginRight: "0.3em", opacity: 0 }}>
                  {word}
                </span>
              ))}
            </h1>
            <p className="hero-copy hero-copy-anim" style={{ opacity: 0 }}>
              A Íntegra traduz COEs, operações estruturadas, FGC e possíveis conflitos de interesse em um diagnóstico objetivo, visual e acionável. Sem rebate. Sem venda de produto.
            </p>
            <div className="hero-actions" style={{ opacity: 0 }}>
              <a className="button button-accent" href={quickMessage} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                Começar pelo WhatsApp
              </a>
              <a className="button button-secondary" href="#triagem">
                <ClipboardCheck size={18} aria-hidden="true" />
                Preencher triagem
              </a>
            </div>
            <div className="hero-proof">
              {[
                { strong: "R$ 129,00", span: "Análise inicial para entender se há caso e qual caminho seguir." },
                { strong: "Sem call", span: "Não recomendamos compra de novos ativos no modelo inicial." },
                { strong: "Com método", span: "Premissas, cenários, documentos e perguntas de negociação." },
              ].map((item, i) => (
                <div key={i} className="proof-item hero-proof-item" style={{ opacity: 0 }}>
                  <strong>{item.strong}</strong>
                  <span>{item.span}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="diagnostic-board" aria-label="Exemplo de mapa de diagnóstico" style={{ opacity: 0 }}>
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
