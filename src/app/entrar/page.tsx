import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { login } from "./actions";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ erro?: string; next?: string }>;
}) {
  const params = await searchParams;
  const configured = hasSupabaseConfig();

  return (
    <main className="login-page">
      <div className="login-brand-panel">
        <Link className="brand brand-light" href="/">
          <span className="brand-mark">Í</span>
          <span className="brand-name"><strong>Íntegra</strong><small>Consultoria</small></span>
        </Link>
        <div>
          <p className="app-kicker">Área interna</p>
          <h1>Clareza para conduzir cada caso.</h1>
          <p>Leads, documentos, tarefas e entregas em um único fluxo protegido.</p>
        </div>
        <small>Acesso exclusivo dos sócios da Íntegra.</small>
      </div>
      <section className="login-form-panel">
        <div className="login-box">
          <span className="login-icon"><LockKeyhole size={22} /></span>
          <p className="app-kicker">CRM Íntegra</p>
          <h2>Entrar</h2>
          <p className="login-copy">Use o e-mail cadastrado no ambiente interno.</p>
          {!configured ? (
            <div className="app-alert warning">
              Configure as variáveis do Supabase para habilitar o acesso.
            </div>
          ) : (
            <form action={login} className="login-form">
              <input type="hidden" name="next" value={params.next || "/app"} />
              <label>E-mail<input name="email" type="email" required autoComplete="email" /></label>
              <label>Senha<input name="password" type="password" required autoComplete="current-password" /></label>
              {params.erro && <p className="form-error">{params.erro}</p>}
              <button className="button button-primary" type="submit">Entrar no CRM</button>
            </form>
          )}
          <Link className="back-link" href="/"><ArrowLeft size={16} /> Voltar ao site</Link>
        </div>
      </section>
    </main>
  );
}

