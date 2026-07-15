export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]" style={{ background: "#fafcfb", padding: "42px 0", color: "var(--muted-color)", fontSize: "12px", lineHeight: "1.55" }}>
      <div className="shell">
        <div className="grid gap-[50px]" style={{ gridTemplateColumns: "0.7fr 1.3fr" }}>
          <div>
            <strong className="block mb-2" style={{ color: "var(--ink)", font: "700 17px/1.2 Georgia, serif" }}>Íntegra Consultoria</strong>
            Diagnóstico independente para produtos financeiros complexos.
          </div>
          <div>
            <a href="/privacidade" className="font-bold underline underline-offset-2" style={{ color: "var(--accent-dark)" }}>Aviso de Privacidade</a><br />
            A Íntegra não distribui produtos financeiros, não recebe rebate de instituições e não presta, no modelo inicial, recomendação personalizada de compra de valores mobiliários.
          </div>
        </div>
      </div>
      <style>{`@media(max-width:660px){footer .shell>div{grid-template-columns:1fr!important;gap:24px}}`}</style>
    </footer>
  );
}
