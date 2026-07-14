"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/crm";
import { slugifyServiceName } from "@/lib/services";

const paymentStatuses = ["rascunho", "enviado", "pendente", "parcial", "pago", "vencido", "reembolsado", "estornado", "cancelado"];
const pricingModels = ["fixed", "starting_at", "hourly", "percentage", "hybrid", "custom"];

async function audit(entityType: string, entityId: string, action: string, metadata = {}) {
  const { supabase, profile } = await requireStaff();
  await supabase.from("activities").insert({ actor_id: profile.id, entity_type: entityType, entity_id: entityId, action, metadata });
}

export async function createReceivable(formData: FormData) {
  const caseId = String(formData.get("case_id") || "");
  const amount = parseDecimal(formData.get("amount"));
  const feeAmount = parseDecimal(formData.get("fee_amount")) || 0;
  const status = String(formData.get("status") || "rascunho");
  if (!caseId || amount === null || amount < 0 || feeAmount < 0 || feeAmount > amount || !paymentStatuses.includes(status)) return;

  const { supabase, profile } = await requireStaff();
  const { data: caseRow } = await supabase.from("cases").select("service_id,title,case_type").eq("id", caseId).single();
  let serviceId = String(formData.get("service_id") || "") || caseRow?.service_id || null;
  if (!serviceId && caseRow) {
    const serviceSlug = caseRow.case_type === "analise_inicial" ? "analise-inicial" : caseRow.case_type === "segunda_opiniao" ? "segunda-opiniao" : "suporte-de-caso";
    const { data: service } = await supabase.from("services").select("id").eq("slug", serviceSlug).maybeSingle();
    serviceId = service?.id || null;
  }
  let description = String(formData.get("description") || "").trim();
  if (!description && serviceId) {
    const { data: service } = await supabase.from("services").select("name").eq("id", serviceId).single();
    description = service?.name || "";
  }
  const now = new Date().toISOString();
  const { data } = await supabase.from("payments").insert({
    case_id: caseId,
    service_id: serviceId,
    description: description || caseRow?.title || "Cobrança de serviço",
    amount,
    fee_amount: feeAmount,
    net_amount: amount - feeAmount,
    due_date: String(formData.get("due_date") || "") || null,
    method: String(formData.get("method") || "") || null,
    provider: String(formData.get("provider") || "") || null,
    external_reference: String(formData.get("external_reference") || "").trim() || null,
    payment_url: String(formData.get("payment_url") || "").trim() || null,
    installment_count: Number(formData.get("installment_count") || 1),
    status,
    issued_at: ["enviado", "pendente", "parcial", "pago"].includes(status) ? now : null,
    paid_at: status === "pago" ? now : null,
    notes: String(formData.get("notes") || "").trim() || null,
    created_by: profile.id
  }).select("id").single();
  if (!data?.id) return;
  await audit("payment", data.id, "created", { case_id: caseId, amount, provider: String(formData.get("provider") || "manual") });
  await audit("case", caseId, "payment_created", { payment_id: data.id, amount, status });
  revalidatePath("/app/financeiro"); revalidatePath("/app"); revalidatePath(`/app/casos/${caseId}`);
}

export async function updateReceivableStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !paymentStatuses.includes(status)) return;
  const { supabase } = await requireStaff();
  const { data: payment } = await supabase.from("payments").select("case_id").eq("id", id).single();
  const now = new Date().toISOString();
  const update: Record<string, string | null> = { status, updated_at: now };
  if (status === "pago") update.paid_at = now;
  if (["enviado", "pendente", "parcial", "pago"].includes(status)) update.issued_at = now;
  await supabase.from("payments").update(update).eq("id", id);
  await audit("payment", id, "status_updated", { status });
  revalidatePath("/app/financeiro"); revalidatePath("/app");
  if (payment?.case_id) revalidatePath(`/app/casos/${payment.case_id}`);
}

export async function saveService(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const pricingModel = String(formData.get("pricing_model") || "custom");
  if (!name || !description || !pricingModels.includes(pricingModel)) return;
  const { supabase, profile } = await requireStaff();
  const values = {
    name,
    badge: String(formData.get("badge") || "").trim() || null,
    description,
    pricing_model: pricingModel,
    base_price: parseDecimal(formData.get("base_price")),
    percentage_rate: parseDecimal(formData.get("percentage_rate")),
    price_label_override: String(formData.get("price_label_override") || "").trim() || null,
    price_note: String(formData.get("price_note") || "").trim() || null,
    features: String(formData.get("features") || "").split("\n").map((item) => item.trim()).filter(Boolean),
    active: formData.get("active") === "on",
    public_visible: formData.get("public_visible") === "on",
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") || 100),
    updated_at: new Date().toISOString()
  };
  let serviceId = id;
  if (id) {
    await supabase.from("services").update(values).eq("id", id);
  } else {
    const baseSlug = slugifyServiceName(name) || "servico";
    const { data: existing } = await supabase.from("services").select("slug").eq("slug", baseSlug).maybeSingle();
    const slug = existing ? `${baseSlug}-${Date.now().toString().slice(-6)}` : baseSlug;
    const { data } = await supabase.from("services").insert({ ...values, slug, created_by: profile.id }).select("id").single();
    serviceId = data?.id || "";
  }
  await audit("service", serviceId || profile.id, id ? "updated" : "created", { name, pricing_model: pricingModel });
  revalidatePath("/app/servicos"); revalidatePath("/"); revalidatePath("/api/services");
}

function parseDecimal(value: FormDataEntryValue | null) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}
