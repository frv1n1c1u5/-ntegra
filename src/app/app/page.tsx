import { ArrowRight, BriefcaseBusiness, CircleDollarSign, Contact, FileClock, ListTodo } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate, requireStaff } from "@/lib/crm";

export default async function DashboardPage() {
  const { supabase, profile } = await requireStaff();
  const today = new Date().toISOString();
  const [leads, cases, tasks, payments, activities] = await Promise.all([
    supabase.from("leads").select("id,name,institution,stage,created_at").eq("stage", "novo").order("created_at", { ascending: false }),
    supabase.from("cases").select("id,title,stage,updated_at,clients(full_name)").not("stage", "in", '("encerrado","cancelado")').order("updated_at", { ascending: false }),
    supabase.from("tasks").select("id,title,due_at,completed_at").is("completed_at", null).lte("due_at", today).order("due_at"),
    supabase.from("payments").select("id,amount,status,due_date,cases(title)").in("status", ["pendente", "parcial"]).order("due_date"),
    supabase.from("activities").select("id,entity_type,action,created_at").order("created_at", { ascending: false }).limit(6)
  ]);
  const openCases = cases.data || [];
  const waitingDocs = openCases.filter((item) => item.stage === "aguardando_documentos").length;
  const pendingTotal = (payments.data || []).reduce((sum, item) => sum + Number(item.amount), 0);

  return <main className="crm-content">
    <header className="page-heading"><div><p className="app-kicker">Visão geral</p><h1>Bom trabalho, {profile.full_name.split(" ")[0]}.</h1><p>O que exige atenção na operação da Íntegra hoje.</p></div><Link className="app-button primary" href="/app/leads">Abrir funil <ArrowRight size={17}/></Link></header>
    <section className="metric-grid">
      <Link href="/app/leads" className="metric-card"><Contact/><span>Leads novos</span><strong>{leads.data?.length || 0}</strong><small>aguardando primeiro contato</small></Link>
      <Link href="/app/casos" className="metric-card"><BriefcaseBusiness/><span>Casos ativos</span><strong>{openCases.length}</strong><small>em todas as etapas</small></Link>
      <Link href="/app/casos" className="metric-card"><FileClock/><span>Aguardando docs</span><strong>{waitingDocs}</strong><small>com pendência documental</small></Link>
      <Link href="/app/tarefas" className="metric-card warning"><ListTodo/><span>Tarefas vencidas</span><strong>{tasks.data?.length || 0}</strong><small>precisam de ação</small></Link>
      <div className="metric-card"><CircleDollarSign/><span>Valores pendentes</span><strong className="money">{formatCurrency(pendingTotal)}</strong><small>controle manual</small></div>
    </section>
    <section className="dashboard-grid">
      <div className="app-panel"><div className="panel-heading"><div><p className="app-kicker">Casos</p><h2>Trabalho em andamento</h2></div><Link href="/app/casos">Ver todos</Link></div><div className="compact-list">{openCases.slice(0,6).map((item)=><Link href={`/app/casos/${item.id}`} key={item.id} className="compact-row"><span className={`status-dot stage-${item.stage}`}/><div><strong>{item.title}</strong><small>{(item.clients as unknown as {full_name:string}|null)?.full_name || "Cliente"}</small></div><span className="stage-label">{item.stage.replaceAll("_"," ")}</span></Link>)}{!openCases.length&&<Empty text="Nenhum caso ativo ainda."/>}</div></div>
      <div className="app-panel"><div className="panel-heading"><div><p className="app-kicker">Atividade</p><h2>Movimentações recentes</h2></div></div><div className="activity-list">{(activities.data||[]).map((item)=><div key={item.id}><span/><p><strong>{item.action.replaceAll("_"," ")}</strong><small>{item.entity_type} • {formatDate(item.created_at)}</small></p></div>)}{!activities.data?.length&&<Empty text="As alterações importantes aparecerão aqui."/>}</div></div>
    </section>
  </main>;
}
function Empty({text}:{text:string}) { return <div className="empty-inline">{text}</div>; }

