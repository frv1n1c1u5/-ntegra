"use client";
import { BriefcaseBusiness, Contact, LayoutDashboard, ListTodo, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [["/app", "Visão geral", LayoutDashboard], ["/app/leads", "Leads", Contact], ["/app/clientes", "Clientes", UsersRound], ["/app/casos", "Casos", BriefcaseBusiness], ["/app/tarefas", "Tarefas", ListTodo]] as const;
export function AppNav() { const pathname = usePathname(); return <nav className="app-nav" aria-label="Navegação do CRM">{links.map(([href,label,Icon])=>{const active=href==="/app"?pathname===href:pathname.startsWith(href);return <Link key={href} href={href} className={active?"active":""}><Icon size={18}/><span>{label}</span></Link>;})}</nav>; }

