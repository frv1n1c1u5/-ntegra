"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551999381379";

const navLinks = [
  { label: "Dores", href: "#dores" },
  { label: "Método", href: "#metodo" },
  { label: "Preços", href: "#precos" },
  { label: "Blog", href: "#blog-preview" },
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
    <nav
      className={`nav ${scrolled ? "nav-scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: scrolled ? "1px solid rgba(216,225,221,0.82)" : "1px solid transparent",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
        transition: "all 0.3s ease",
      }}
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

          <div className="nav-links hidden md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a
            className="button button-primary hidden md:inline-flex"
            href={quickMessage}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 14 }}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Falar agora
          </a>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            style={{ color: "var(--ink)" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-6 border-t pt-4" style={{ borderColor: "var(--line)" }}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-2"
                  style={{ color: "var(--muted)", fontSize: 15 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a className="button button-primary mt-2" href={quickMessage} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                Falar agora
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
