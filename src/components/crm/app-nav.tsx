"use client";
import {BriefcaseBusiness,Contact,LayoutDashboard,ListTodo,UsersRound} from "lucide-react";
import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
const links=[["/app","Visao geral",LayoutDashboard],["/app/leads","Leads",Contact],["/app/clientes","Clientes",UsersRound],["/app/casos","Casos",BriefcaseBusiness],["/app/tarefas","Tarefas",ListTodo]] as const;
export function AppNav(){const pathname=usePathname();const router=useRouter();return <nav className="app-nav" aria-label="Navegacao do CRM">{links.map(([href,label,Icon])=>{const active=href==="/app"?pathname===href:pathname.startsWith(href);const prefetch=()=>router.prefetch(href);return <Link key={href} href={href} className={active?"active":""} onMouseEnter={prefetch} onFocus={prefetch}><Icon size={18}/><span>{label}</span></Link>})}</nav>}
