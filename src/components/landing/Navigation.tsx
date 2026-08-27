"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { trackConversion } from "@/lib/analytics";
import { qualifiedWhatsAppUrl } from "@/lib/contact";

const navLinks = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Método", href: "/como-funciona" },
  { label: "Preços", href: "/precos" },
  { label: "Blog", href: "/blog" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || (href === "/blog" && pathname.startsWith("/blog/"));

  return <>
    <nav className={`nav editorial-nav ${mobileOpen ? "nav-open" : ""}`} aria-label="Navegação principal">
      <div className="shell nav-inner">
        <Link className="brand" href="/" onClick={() => setMobileOpen(false)} aria-label="Íntegra, página inicial">
          <span className="brand-mark" aria-hidden="true">Í</span><span className="brand-name"><strong>Íntegra</strong><small>Leitura independente</small></span>
        </Link>
        <div className="nav-links desktop-nav-links">
          {navLinks.map((link) => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}
        </div>
        <a className="button button-primary desktop-nav-cta" href={qualifiedWhatsAppUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_cta", { placement: "navigation" })}><MessageCircle size={17} aria-hidden="true" />Falar agora</a>
        <button className="mobile-menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileOpen} aria-controls="mobile-menu">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {mobileOpen && <div id="mobile-menu" className="mobile-menu-panel"><div className="shell">
        {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}
        <a className="button button-primary" href={qualifiedWhatsAppUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_cta", { placement: "mobile_navigation" })}><MessageCircle size={18} aria-hidden="true" />Falar agora</a>
      </div></div>}
    </nav>
    <div className="mobile-conversion-bar" aria-label="Contato rápido"><div><strong>Dossiê Expresso</strong><span>R$ 229 · até 48h</span></div><a href={qualifiedWhatsAppUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("whatsapp_cta", { placement: "mobile_bar" })}><MessageCircle size={19} aria-hidden="true" />WhatsApp</a></div>
  </>;
}
