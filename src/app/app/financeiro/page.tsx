import { ArrowUpRight, CircleDollarSign, Clock3, Landmark, ReceiptText, WalletCards } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate, requireStaff } from "@/lib/crm";
import { updateReceivableStatus } from "../finance-actions";
import { ReceivableForm } from "@/components/crm/receivable-form";

const statuses = [["rascunho", "Rascunho"], ["enviado", "Enviado"], ["pendente", "Pendente"], ["parcial", "Parcial"], ["pago", "Pago"], ["vencido", "Vencido"], ["reembolsado", "Reembolsado"], ["estornado", "Estornado"], ["cancelado", "Cancelado"]] as const;
const openStatuses = new Set(["enviado", "pendente", "parcial", "vencido"]);

type CaseRelation = { id: string; title: string; clients: { full_name: string } | null } | null;
type ServiceRelation = { name: string } | null;

export default async function FinancePage() {
  const { supabase } = await requireStaff();
  const [{ data: payments }, { data: cases }, { data: services }] = await Promise.all([
    supabase.from("payments").select("*,cases(id,title,clients(full_name)),services(name)").order("created_at", { ascending: false }),
    supabase.from("cases").select("id,title,stage,clients(full_name)").not("stage", "in", '("encerrado","cancelado")').order("updated_at", { ascending: false }),
    supabase.from("services").select("id,name,pricing_model,base_price,percentage_rate,price_label_override,active").eq("active", true).order("sort_order")
  ]);
  const rows = payments || [];
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
  const pendingTotal = rows.filter((row) => openStatuses.has(row.status)).reduce((sum, row) => sum + Number(row.amount), 0);
  const paidThisMonth = rows.filter((row) => row.status === "pago" && row.paid_at && new Date(row.paid_at).getTime() >= monthStart).reduce((sum, row) => sum + Number(row.amount), 0);
  const feesThisMonth = rows.filter((row) => row.status === "pago" && row.paid_at && new Date(row.paid_at).getTime() >= monthStart).reduce((sum, row) => sum + Number(row.fee_amount || 0), 0);
  const overdue = rows.filter((row) => openStatuses.has(row.status) && row.due_date && new Date(`${row.due_date}T23:59:59`).getTime() < today.getTime()).length;

  return <main className="crm-content finance-page">
    <header className="page-heading"><div><p className="app-kicker">Controle operacional</p><h1>Financeiro</h1><p>Cobranças, recebimentos e conciliação. A contabilidade oficial continua na Contabilizei.</p></div><Link className="app-button" href="/app/servicos">Serviços e preços <ArrowUpRight size={16}/></Link></header>
    <section className="finance-metrics">
      <div className="finance-metric"><span className="metric-icon mint"><CircleDollarSign/></span><div><small>A receber</small><strong>{formatCurrency(pendingTotal)}</strong><span>{rows.filter((row) => openStatuses.has(row.status)).length} cobranças abertas</span></div></div>
      <div className="finance-metric"><span className="metric-icon dark"><WalletCards/></span><div><small>Recebido no mês</small><strong>{formatCurrency(paidThisMonth)}</strong><span>valor bruto confirmado</span></div></div>
      <div className="finance-metric"><span className="metric-icon gold"><ReceiptText/></span><div><small>Taxas no mês</small><strong>{formatCurrency(feesThisMonth)}</strong><span>preenchimento manual</span></div></div>
      <div className="finance-metric"><span className="metric-icon alert"><Clock3/></span><div><small>Vencidas</small><strong>{overdue}</strong><span>precisam de conferência</span></div></div>
    </section>
    <div className="finance-layout">
      <section className="app-panel receivables-panel"><div className="panel-heading"><div><p className="app-kicker">Recebíveis</p><h2>Histórico de cobranças</h2></div><span>{rows.length} registros</span></div>
        <div className="receivable-list">{rows.map((row) => {const caseRow = row.cases as unknown as CaseRelation; const service = row.services as unknown as ServiceRelation; const late = openStatuses.has(row.status) && row.due_date && new Date(`${row.due_date}T23:59:59`).getTime() < today.getTime(); return <article className="receivable-row" key={row.id}>
          <div className="receivable-main"><span className="receivable-mark"><Landmark size={17}/></span><div><strong>{row.description || service?.name || "Cobrança de serviço"}</strong><Link href={caseRow ? `/app/casos/${caseRow.id}` : "/app/casos"}>{caseRow?.clients?.full_name || "Cliente"} · {caseRow?.title || "Caso"}</Link></div></div>
          <div className="receivable-value"><strong>{formatCurrency(row.amount)}</strong><small>Líquido {formatCurrency(row.net_amount ?? row.amount)}</small></div>
          <div className="receivable-due"><small>Vencimento</small><span className={late ? "late" : ""}>{formatDate(row.due_date)}</span></div>
          <form action={updateReceivableStatus} className="status-select"><input type="hidden" name="id" value={row.id}/><select name="status" defaultValue={late && row.status !== "vencido" ? "vencido" : row.status}>{statuses.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select><button>Salvar</button></form>
          {(row.payment_url || row.external_reference || row.provider) && <div className="receivable-meta"><span>{row.provider === "contabilizei_bank" ? "Contabilizei Bank" : row.provider || "Manual"}</span>{row.external_reference && <span>Ref. {row.external_reference}</span>}{row.payment_url && <a href={row.payment_url} target="_blank" rel="noreferrer">Abrir link <ArrowUpRight size={12}/></a>}</div>}
        </article>})}{!rows.length && <div className="empty-inline">Nenhuma cobrança registrada. Crie a primeira ao lado.</div>}</div>
      </section>
      <aside className="app-panel sticky-panel"><p className="app-kicker">Nova cobrança</p><h2>Registrar recebível</h2><p className="panel-intro">O link e a referência podem ser preenchidos depois, quando a conta PJ estiver ativa.</p>
        <ReceivableForm cases={(cases || []).map((item) => ({ id: item.id, title: item.title, clientName: (item.clients as unknown as {full_name:string}|null)?.full_name || "Cliente" }))} services={(services || []).map((item) => ({ id: item.id, name: item.name, pricing_model: item.pricing_model, base_price: item.base_price, percentage_rate: item.percentage_rate, price_label_override: item.price_label_override }))}/>
      </aside>
    </div>
  </main>;
}
