"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import "../../app/crm.css";

function safeNext(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//")
    ? value
    : "/definir-senha";
}

export default function AuthCallbackPage() {
  useEffect(() => {
    async function finishAuthentication() {
      const supabase = createClient();
      const search = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const next = safeNext(search.get("next"));
      const code = search.get("code");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      let error = null;

      if (accessToken && refreshToken) {
        ({ error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        }));
      } else if (code) {
        ({ error } = await supabase.auth.exchangeCodeForSession(code));
      } else {
        error = new Error("Link sem credenciais de autenticacao");
      }

      if (error) {
        window.location.replace(
          "/entrar?erro=" +
            encodeURIComponent("Link invalido ou expirado. Solicite um novo acesso."),
        );
        return;
      }

      window.location.replace(next);
    }

    void finishAuthentication();
  }, []);

  return (
    <main className="login-page">
      <section className="login-form-panel">
        <div className="login-box">
          <span className="login-icon" aria-hidden="true">
            <LoaderCircle size={22} />
          </span>
          <p className="app-kicker">Acesso seguro</p>
          <h1>Validando seu link...</h1>
          <p className="login-copy">
            Aguarde enquanto preparamos a definicao da sua senha.
          </p>
        </div>
      </section>
    </main>
  );
}
