"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551999381379";

const navLinks = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Método", href: "/como-funciona" },
  { label: "Preços", href: "/precos" },
  { label: "Blog", href: "/blog" },
];

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const quickMessage = buildWhatsAppUrl(
    "Olá, Íntegra. Quero entender se um produto financeiro que me ofereceram ou que já comprei tem riscos, custos ou conflitos que eu não estou enxergando."
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`nav ${scrolled ? "nav-scrolled" : ""} ${mobileOpen ? "nav-open" : ""}`}
        aria-label="Navegação principal"
      >
        <div className="shell">
          <div className="nav-inner">
            <a className="brand" href="#top" aria-label="Íntegra Consultoria">
              <span className="brand-mark" aria-hidden="true">Í</span>
              <span className="brand-name">
                <strong>Íntegra</strong>
                <small>Consultoria</small>
              </span>
            </a>

            <div className="nav-links desktop-nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <a
              className="button button-primary desktop-nav-cta"
              href={quickMessage}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar agora
            </a>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileOpen && (
            <div id="mobile-menu" className="mobile-menu-panel">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a className="button button-primary" href={quickMessage} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                Falar agora
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className="mobile-conversion-bar" aria-label="Contato rápido">
        <div>
          <strong>Análise inicial</strong>
          <span>R$ 229</span>
        </div>
        <a href={quickMessage} target="_blank" rel="noreferrer">
          <MessageCircle size={19} aria-hidden="true" />
          Falar no WhatsApp
        </a>
      </div>
    </>
  );
}
