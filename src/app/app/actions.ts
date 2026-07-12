"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/crm";

async function audit(entityType: string, entityId: string, action: string, metadata = {}) {
  const { supabase, profile } = await requireStaff();
  await supabase.from("activities").insert({ actor_id: profile.id, entity_type: entityType, entity_id: entityId, action, metadata });
}
const checklistTemplates: Record<string, string[]> = {
  analise_inicial: ["Confirmar escopo e consentimento", "Receber lamina e nota de aplicacao", "Validar emissor, vencimento e indexador", "Mapear custos e riscos", "Preparar diagnostico"],
  segunda_opiniao: ["Receber material da proposta", "Identificar estrutura e cenarios", "Comparar custo de oportunidade", "Registrar premissas", "Entregar segunda opiniao"],
  suporte: ["Definir objetivo do suporte", "Reunir documentos", "Registrar contato com instituicao", "Acompanhar retorno", "Formalizar encerramento"],
  fgc: ["Confirmar elegibilidade", "Reunir documentos do titular", "Validar dados no aplicativo FGC", "Acompanhar solicitacao", "Confirmar recebimento"],
  conflito_interesse: ["Receber suitability e ordens", "Mapear remuneracao aparente", "Comparar produto ao perfil", "Preparar memoria tecnica", "Encaminhar ao juridico quando aplicavel"],
  produto_estruturado: ["Receber boleta e memoria de calculo", "Mapear ativos e derivativos", "Calcular payoff e barreiras", "Comparar montagem direta", "Documentar cenarios"],
};

export async function signOut() {
  const { supabase } = await requireStaff();
  await supabase.auth.signOut();
  redirect("/entrar");
}

export async function updateLeadStage(formData: FormData) {
  const id = String(formData.get("id"));
  const stage = String(formData.get("stage"));
  const lostReason = String(formData.get("lost_reason") || "").trim();
  const allowedStages = ["novo", "contato_iniciado", "aguardando_documentos", "qualificado", "proposta_enviada", "convertido", "perdido"];
  if (!allowedStages.includes(stage)) return { error: "Estagio invalido" };
  if (stage === "perdido" && !lostReason) return { error: "Informe o motivo da perda" };
  const { supabase } = await requireStaff();
  const { error } = await supabase.from("leads").update({ stage, lost_reason: lostReason || null, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: "Nao foi possivel mover o lead" };
  await audit("lead", id, "stage_updated", { stage });
  revalidatePath("/app/leads");
  return { error: null };
}

export async function assignLead(formData: FormData) {
  const id = String(formData.get("id"));
  const { supabase, profile } = await requireStaff();
  await supabase.from("leads").update({ owner_id: profile.id, updated_at: new Date().toISOString() }).eq("id", id);
  await audit("lead", id, "assigned", { owner_id: profile.id });
  revalidatePath("/app/leads");
}

export async function convertLead(formData: FormData) {
  const leadId = String(formData.get("lead_id"));
  const caseType = String(formData.get("case_type"));
  const title = String(formData.get("title") || "Novo caso").trim();
  const { supabase, profile } = await requireStaff();
  const { data: lead } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (!lead) return;
  let clientId = lead.converted_client_id as string | null;
  if (!clientId) {
    const { data: client } = await supabase.from("clients").insert({ full_name: lead.name, phone: lead.phone, email: lead.email, institutions: [lead.institution], created_from_lead_id: lead.id }).select("id").single();
    clientId = client?.id || null;
  }
  if (!clientId) return;
  const { data: createdCase } = await supabase.from("cases").insert({ client_id: clientId, lead_id: leadId, title, case_type: caseType, institution: lead.institution, scope: lead.notes, owner_id: profile.id }).select("id").single();
  await supabase.from("leads").update({ stage: "convertido", converted_client_id: clientId, owner_id: profile.id }).eq("id", leadId);
  await audit("lead", leadId, "converted", { client_id: clientId, case_id: createdCase?.id });
  if (createdCase?.id) {
    const titles = checklistTemplates[caseType] || checklistTemplates.analise_inicial;
    await supabase.from("tasks").insert(titles.map((taskTitle, index) => ({ case_id: createdCase.id, title: `[Checklist] ${taskTitle}`, priority: index < 2 ? 1 : 2, assignee_id: profile.id })));
    await audit("case", createdCase.id, "checklist_initialized", { case_type: caseType, total: titles.length });
  }
  redirect(createdCase?.id ? `/app/casos/${createdCase.id}` : "/app/casos");
}

export async function updateCaseStage(formData: FormData) {
  const id = String(formData.get("id"));
  const stage = String(formData.get("stage"));
  const now = new Date().toISOString();
  const extra = stage === "entregue" ? { delivered_at: now } : stage === "encerrado" ? { closed_at: now } : {};
  const { supabase } = await requireStaff();
  await supabase.from("cases").update({ stage, updated_at: now, ...extra }).eq("id", id);
  await audit("case", id, "stage_updated", { stage });
  revalidatePath(`/app/casos/${id}`); revalidatePath("/app");
}

export async function addCaseNote(formData: FormData) {
  const caseId = String(formData.get("case_id"));
  const body = String(formData.get("body") || "").trim();
  const noteType = String(formData.get("note_type") || "observacao");
  if (!body) return;
  const { supabase, profile } = await requireStaff();
  await supabase.from("case_notes").insert({ case_id: caseId, body, note_type: noteType, author_id: profile.id });
  await audit("case", caseId, "note_added", { note_type: noteType });
  revalidatePath(`/app/casos/${caseId}`);
}

export async function addTask(formData: FormData) {
  const caseId = String(formData.get("case_id") || "") || null;
  const leadId = String(formData.get("lead_id") || "") || null;
  const title = String(formData.get("title") || "").trim();
  if (!title || (!caseId && !leadId)) return;
  const { supabase, profile } = await requireStaff();
  const { data } = await supabase.from("tasks").insert({ case_id: caseId, lead_id: leadId, title, due_at: String(formData.get("due_at") || "") || null, priority: Number(formData.get("priority") || 2), assignee_id: profile.id }).select("id").single();
  await audit("task", data?.id || caseId || leadId!, "created");
  if (caseId) await audit("case", caseId, "task_created", { task_id: data?.id, title });
  revalidatePath("/app/tarefas"); if (caseId) revalidatePath(`/app/casos/${caseId}`);
}

export async function toggleTask(formData: FormData) {
  const id = String(formData.get("id"));
  const complete = String(formData.get("complete")) === "true";
  const { supabase } = await requireStaff();
  const { data: task } = await supabase.from("tasks").select("case_id,title").eq("id", id).single();
  await supabase.from("tasks").update({ completed_at: complete ? new Date().toISOString() : null }).eq("id", id);
  await audit("task", id, complete ? "completed" : "reopened");
  if (task?.case_id) await audit("case", task.case_id, complete ? "task_completed" : "task_reopened", { task_id: id, title: task.title });
  revalidatePath("/app/tarefas"); revalidatePath("/app");
}

export async function savePayment(formData: FormData) {
  const caseId = String(formData.get("case_id"));
  const amount = Number(String(formData.get("amount") || "0").replace(",", "."));
  if (!Number.isFinite(amount) || amount < 0) return;
  const { supabase } = await requireStaff();
  const status = String(formData.get("status") || "pendente");
  const { data } = await supabase.from("payments").insert({ case_id: caseId, amount, due_date: String(formData.get("due_date") || "") || null, method: String(formData.get("method") || "") || null, status, paid_at: status === "pago" ? new Date().toISOString() : null }).select("id").single();
  await audit("payment", data?.id || caseId, "created", { case_id: caseId, amount });
  await audit("case", caseId, "payment_created", { payment_id: data?.id, amount, status });
  revalidatePath(`/app/casos/${caseId}`); revalidatePath("/app");
}
export async function saveTechnicalSheet(formData: FormData) {
  const caseId = String(formData.get("case_id"));
  const fields = ["product_name", "issuer", "product_category", "contract_date", "maturity_date", "indexer", "advisor_name", "client_objective", "alleged_risk", "analyzed_amount", "opportunity_cost", "estimated_loss", "technical_notes"];
  const details = Object.fromEntries(fields.map((field) => [field, String(formData.get(field) || "").trim()]));
  const { supabase, profile } = await requireStaff();
  const analyzedAmount = Number(details.analyzed_amount.replace(",", "."));
  await supabase.from("cases").update({ product_name: details.product_name || null, analyzed_amount: Number.isFinite(analyzedAmount) ? analyzedAmount : null, updated_at: new Date().toISOString() }).eq("id", caseId);
  await supabase.from("case_notes").insert({ case_id: caseId, note_type: "ficha_tecnica", body: JSON.stringify(details), author_id: profile.id });
  await audit("case", caseId, "technical_sheet_updated", { fields: fields.filter((field) => details[field]) });
  revalidatePath(`/app/casos/${caseId}`);
}

export async function initializeCaseChecklist(formData: FormData) {
  const caseId = String(formData.get("case_id"));
  const caseType = String(formData.get("case_type"));
  const { supabase, profile } = await requireStaff();
  const { data: existing } = await supabase.from("tasks").select("title").eq("case_id", caseId).like("title", "[Checklist]%");
  if (existing?.length) return;
  const titles = checklistTemplates[caseType] || checklistTemplates.analise_inicial;
  await supabase.from("tasks").insert(titles.map((title, index) => ({ case_id: caseId, title: `[Checklist] ${title}`, priority: index < 2 ? 1 : 2, assignee_id: profile.id })));
  await audit("case", caseId, "checklist_initialized", { case_type: caseType, total: titles.length });
  revalidatePath(`/app/casos/${caseId}`);
}
