"use client";

import { ReceiptText } from "lucide-react";
import { useState } from "react";
import { createReceivable } from "@/app/app/finance-actions";
import { formatServicePrice } from "@/lib/services";

type CaseOption = { id: string; title: string; clientName: string };
type ServiceOption = {
  id: string;
  name: string;
  pricing_model: "fixed" | "starting_at" | "hourly" | "percentage" | "hybrid" | "custom";
  base_price: number | null;
  percentage_rate: number | null;
  price_label_override: string | null;
};

const statuses = [["rascunho", "Rascunho"], ["enviado", "Enviado"], ["pendente", "Pendente"], ["parcial", "Parcial"], ["pago", "Pago"], ["vencido", "Vencido"], ["reembolsado", "Reembolsado"], ["estornado", "Estornado"], ["cancelado", "Cancelado"]] as const;

export function ReceivableForm({ cases, services }: { cases: CaseOption[]; services: ServiceOption[] }) {
  const [serviceId, setServiceId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const selected = services.find((service) => service.id === serviceId);

  function selectService(id: string) {
    setServiceId(id);
    const service = services.find((item) => item.id === id);
    if (!service) return;
    setDescription(service.name);
    setAmount(service.base_price == null ? "" : Number(service.base_price).toFixed(2).replace(".", ","));
  }

  return <form action={createReceivable} className="stack-form finance-form">
    <label>Caso<select name="case_id" required defaultValue=""><option value="" disabled>Selecione o caso</option>{cases.map((item) => <option value={item.id} key={item.id}>{item.clientName} · {item.title}</option>)}</select></label>
    <label>Serviço<select name="service_id" value={serviceId} onChange={(event) => selectService(event.target.value)}><option value="">Usar serviço do caso</option>{services.map((item) => <option value={item.id} key={item.id}>{item.name} · {formatServicePrice(item)}</option>)}</select></label>
    {selected && <p className="pricing-model-hint">Preço vigente no catálogo: <strong>{formatServicePrice(selected)}</strong>. O valor abaixo fica salvo nesta cobrança e não muda em reajustes futuros.</p>}
    <label>Descrição<input name="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Ex.: Análise inicial"/></label>
    <div className="form-pair"><label>Valor bruto<input name="amount" required inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="129,00"/></label><label>Taxas<input name="fee_amount" inputMode="decimal" placeholder="0,00"/></label></div>
    <div className="form-pair"><label>Vencimento<input name="due_date" type="date"/></label><label>Parcelas<input name="installment_count" type="number" min="1" max="24" defaultValue="1"/></label></div>
    <div className="form-pair"><label>Método<select name="method" defaultValue=""><option value="">A definir</option><option value="pix">Pix</option><option value="cartao">Cartão</option><option value="transferencia">Transferência</option><option value="boleto">Boleto</option></select></label><label>Status<select name="status" defaultValue="rascunho">{statuses.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label></div>
    <label>Provedor<select name="provider" defaultValue="manual"><option value="manual">Controle manual</option><option value="contabilizei_bank">Contabilizei Bank</option><option value="outro">Outro</option></select></label>
    <details className="provider-fields"><summary>Dados do link de cobrança</summary><div><label>Link de pagamento<input name="payment_url" type="url" placeholder="https://..."/></label><label>Referência externa<input name="external_reference" placeholder="Código da cobrança no provedor"/></label></div></details>
    <label>Observações<textarea name="notes" placeholder="Condições, acordo ou conferência pendente."/></label>
    <button className="app-button primary"><ReceiptText size={16}/> Criar cobrança</button>
  </form>;
}
