"use client";

import { BriefcaseBusiness, Contact, Ellipsis, LayoutDashboard, ListTodo, Settings2, UsersRound, WalletCards } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./app-nav.module.css";

const allLinks = [
  ["/app", "Visão geral", LayoutDashboard],
  ["/app/leads", "Leads", Contact],
  ["/app/clientes", "Clientes", UsersRound],
  ["/app/casos", "Casos", BriefcaseBusiness],
  ["/app/tarefas", "Tarefas", ListTodo],
  ["/app/financeiro", "Financeiro", WalletCards],
  ["/app/servicos", "Serviços e preços", Settings2]
] as const;

const mobilePrimary = [allLinks[0], allLinks[1], allLinks[3], allLinks[4]] as const;
const mobileSecondary = [allLinks[2], allLinks[5], allLinks[6]] as const;

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const isActive = (href: string) => href === "/app" ? pathname === href : pathname.startsWith(href);
  const moreActive = mobileSecondary.some(([href]) => isActive(href));
  const prefetch = (href: string) => router.prefetch(href);
  useEffect(() => {
    if (!moreOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMoreOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [moreOpen]);

  return <>
    {moreOpen && <button className={styles.backdrop} type="button" aria-label="Fechar menu" onClick={() => setMoreOpen(false)}/>}
    {moreOpen && <div className={styles.moreSheet} id="crm-more-menu" role="dialog" aria-label="Mais áreas do CRM">
      <div className={styles.sheetHeading}><div><small>Navegação</small><strong>Mais áreas</strong></div><button type="button" onClick={() => setMoreOpen(false)} aria-label="Fechar menu">Fechar</button></div>
      <div className={styles.sheetLinks}>{mobileSecondary.map(([href, label, Icon]) => <Link key={href} href={href} className={isActive(href) ? styles.sheetActive : ""} onClick={() => setMoreOpen(false)} onMouseEnter={() => prefetch(href)} onFocus={() => prefetch(href)}><span><Icon size={19}/></span><div><strong>{label}</strong><small>{href === "/app/clientes" ? "Cadastros e histórico" : href === "/app/financeiro" ? "Cobranças e recebimentos" : "Catálogo e valores"}</small></div></Link>)}</div>
    </div>}
    <nav className={`app-nav ${styles.nav}`} aria-label="Navegação do CRM">
      {allLinks.map(([href, label, Icon]) => <Link key={`desktop-${href}`} href={href} className={`${styles.desktopOnly} ${isActive(href) ? "active" : ""}`} onMouseEnter={() => prefetch(href)} onFocus={() => prefetch(href)}><Icon size={18}/><span>{label}</span></Link>)}
      {mobilePrimary.map(([href, label, Icon]) => <Link key={`mobile-${href}`} href={href} className={`${styles.mobileOnly} ${isActive(href) ? "active" : ""}`} onFocus={() => prefetch(href)}><Icon size={19}/><span>{label}</span></Link>)}
      <button className={`${styles.mobileOnly} ${styles.moreButton} ${moreActive || moreOpen ? styles.moreActive : ""}`} type="button" aria-expanded={moreOpen} aria-controls="crm-more-menu" onClick={() => setMoreOpen((open) => !open)}><Ellipsis size={20}/><span>Mais</span></button>
    </nav>
  </>;
}
