import { BadgeDollarSign, Plus, Settings2 } from "lucide-react";
import { formatCurrency, requireStaff } from "@/lib/crm";
import { formatServicePrice, type PublicService } from "@/lib/services";
import { saveService } from "../finance-actions";

const models = [["fixed", "Preço fixo"], ["starting_at", "A partir de"], ["hourly", "Por hora"], ["percentage", "Percentual"], ["hybrid", "Fixo + percentual"], ["custom", "Sob análise"]] as const;

export default async function ServicesPage() {
  const { supabase } = await requireStaff();
  const { data } = await supabase.from("services").select("*").order("sort_order");
  const services = data || [];
  return <main className="crm-content services-page">
    <header className="page-heading"><div><p className="app-kicker">Configuração comercial</p><h1>Serviços e preços</h1><p>Uma única fonte para o CRM e a seção de preços da landing page.</p></div></header>
    <div className="catalog-layout"><section className="service-catalog">{services.map((service) => <article className={`service-admin-card ${service.active ? "" : "inactive"}`} key={service.id}>
      <div className="service-admin-summary"><span className="service-admin-icon"><BadgeDollarSign/></span><div><div className="service-flags"><span>{service.badge || "Serviço"}</span>{service.public_visible && <span className="public-flag">Na landing</span>}{!service.active && <span className="inactive-flag">Inativo</span>}</div><h2>{service.name}</h2><p>{service.description}</p></div><strong>{formatServicePrice(service as PublicService)}</strong></div>
      <details><summary><Settings2 size={15}/> Editar serviço</summary><ServiceForm service={service}/></details>
    </article>)}{!services.length && <div className="empty-inline">Aplique a migração do catálogo para visualizar os serviços.</div>}</section>
    <aside className="app-panel sticky-panel new-service-panel"><p className="app-kicker">Catálogo</p><h2>Adicionar serviço</h2><p className="panel-intro">Novos serviços podem ser internos ou publicados automaticamente na landing.</p><ServiceForm/></aside></div>
  </main>;
}

function ServiceForm({ service }: { service?: Record<string, unknown> }) {
  const features = Array.isArray(service?.features) ? service.features.join("\n") : "";
  return <form action={saveService} className="stack-form service-form">{Boolean(service?.id) && <input type="hidden" name="id" value={String(service?.id)}/>}<label>Nome<input name="name" required defaultValue={String(service?.name || "")}/></label><label>Rótulo curto<input name="badge" defaultValue={String(service?.badge || "")} placeholder="Entrada, Segunda opinião..."/></label><label>Descrição<textarea name="description" required defaultValue={String(service?.description || "")}/></label><label>Modelo de preço<select name="pricing_model" defaultValue={String(service?.pricing_model || "custom")}>{models.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label><div className="form-pair"><label>Valor base<input name="base_price" inputMode="decimal" defaultValue={service?.base_price == null ? "" : String(service.base_price)} placeholder={formatCurrency(129)}/></label><label>Percentual (%)<input name="percentage_rate" inputMode="decimal" defaultValue={service?.percentage_rate == null ? "" : String(service.percentage_rate)} placeholder="0,1"/></label></div><label>Preço exibido (opcional)<input name="price_label_override" defaultValue={String(service?.price_label_override || "")} placeholder="Sob consulta, valor combinado..."/></label><label>Observação do preço<textarea name="price_note" defaultValue={String(service?.price_note || "")}/></label><label>Destaques da entrega<textarea name="features" defaultValue={features} placeholder={"Um item por linha\nSegundo item"}/></label><label>Ordem<input name="sort_order" type="number" defaultValue={Number(service?.sort_order || 100)}/></label><div className="toggle-stack"><label><input type="checkbox" name="active" defaultChecked={service ? Boolean(service.active) : true}/> Serviço ativo</label><label><input type="checkbox" name="public_visible" defaultChecked={Boolean(service?.public_visible)}/> Mostrar na landing page</label><label><input type="checkbox" name="featured" defaultChecked={Boolean(service?.featured)}/> Destacar como principal</label></div><button className="app-button primary">{service ? <Settings2 size={16}/> : <Plus size={16}/>} {service ? "Salvar alterações" : "Adicionar serviço"}</button></form>;
}
