"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function setPassword(formData: FormData) {
  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("confirmation") || "");
  if (password.length < 12 || password !== confirmation) {
    redirect("/definir-senha?erro=A%20senha%20deve%20ter%2012%20caracteres%20e%20ser%20confirmada");
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/entrar?erro=Sessão%20de%20convite%20expirada");
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect("/definir-senha?erro=Não%20foi%20possível%20definir%20a%20senha");
  redirect("/app");
}

