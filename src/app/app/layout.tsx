import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { AppNav } from "@/components/crm/app-nav";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { requireStaff } from "@/lib/crm";
import { signOut } from "./actions";
import "./crm.css";

export const dynamic = "force-dynamic";
export const preferredRegion = "gru1";

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabaseConfig()) return <main className="crm-setup"><div className="setup-card"><span className="brand-mark">Í</span><p className="app-kicker">CRM Íntegra</p><h1>Conecte o Supabase</h1><p>Copie <code>.env.example</code> para <code>.env.local</code>, informe as credenciais e aplique a migração inicial.</p><Link className="button button-primary" href="/">Voltar ao site</Link></div></main>;
  const { profile } = await requireStaff();
  return <div className="crm-shell"><aside className="crm-sidebar"><Link className="brand crm-brand" href="/app"><span className="brand-mark">Í</span><span className="brand-name"><strong>Íntegra</strong><small>CRM interno</small></span></Link><AppNav/><div className="sidebar-footer"><div className="profile-chip"><span>{profile.full_name.slice(0, 1)}</span><div><strong>{profile.full_name}</strong><small>{profile.email}</small></div></div><form action={signOut}><button className="icon-button" title="Sair"><LogOut size={18}/></button></form></div></aside><div className="crm-main"><header className="crm-topbar"><div><span className="system-dot"/> Ambiente protegido</div><Link href="/" target="_blank">Ver site</Link><Link className="icon-button" href="/app/servicos" title="Configurações"><Settings size={18}/></Link></header>{children}</div></div>;
}
