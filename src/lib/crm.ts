import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const leadStages = [
  ["novo", "Novo"], ["contato_iniciado", "Contato iniciado"],
  ["aguardando_documentos", "Aguardando documentos"], ["qualificado", "Qualificado"],
  ["proposta_enviada", "Proposta enviada"], ["convertido", "Convertido"], ["perdido", "Perdido"]
] as const;

export const caseStages = [
  ["triagem", "Triagem"], ["aguardando_pagamento", "Aguardando pagamento"],
  ["aguardando_documentos", "Aguardando documentos"], ["em_analise", "Em anÃ¡lise"],
  ["em_revisao", "Em revisÃ£o"], ["pronto_para_entrega", "Pronto para entrega"],
  ["entregue", "Entregue"], ["encerrado", "Encerrado"], ["cancelado", "Cancelado"]
] as const;

export const caseTypes = [
  ["analise_inicial", "AnÃ¡lise inicial"], ["segunda_opiniao", "Segunda opiniÃ£o"],
  ["suporte", "Suporte de caso"], ["fgc", "FGC"],
  ["conflito_interesse", "Conflito de interesse"], ["produto_estruturado", "Produto estruturado / COE"]
] as const;

export const requireStaff = cache(async function requireStaff() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/entrar");
  const { data: profile } = await supabase.from("profiles").select("id, full_name, email, status").eq("id", auth.user.id).single();
  if (!profile || profile.status !== "active") redirect("/entrar?erro=Acesso%20nÃ£o%20autorizado");
  return { supabase, user: auth.user, profile };
});

export function formatDate(value?: string | null) {
  if (!value) return "â€”";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export function formatCurrency(value?: number | string | null) {
  if (value === null || value === undefined) return "â€”";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value));
}
