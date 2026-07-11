import { KeyRound } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { setPassword } from "./actions";
import "../app/crm.css";

export default async function SetPasswordPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/entrar?erro=Abra%20o%20link%20recebido%20no%20convite");

  return <main className="login-page"><div className="login-brand-panel"><div className="brand brand-light"><span className="brand-mark">Í</span><span className="brand-name"><strong>Íntegra</strong><small>Consultoria</small></span></div><div><p className="app-kicker">Primeiro acesso</p><h1>Proteja seu acesso.</h1><p>Defina uma senha exclusiva para o ambiente interno da Íntegra.</p></div><small>Acesso exclusivo dos sócios.</small></div><section className="login-form-panel"><div className="login-box"><span className="login-icon"><KeyRound size={22}/></span><p className="app-kicker">Convite confirmado</p><h2>Definir senha</h2><p className="login-copy">Use pelo menos 12 caracteres e não reutilize senhas pessoais.</p><form action={setPassword} className="login-form"><label>Nova senha<input name="password" type="password" required minLength={12} autoComplete="new-password"/></label><label>Confirmar senha<input name="confirmation" type="password" required minLength={12} autoComplete="new-password"/></label>{params.erro&&<p className="form-error">{params.erro}</p>}<button className="button button-primary">Salvar e entrar</button></form></div></section></main>;
}

