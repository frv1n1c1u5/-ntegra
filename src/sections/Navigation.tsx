import { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5551999381379";

const navLinks = [
  { label: "Dores", href: "#dores" },
  { label: "Método", href: "#metodo" },
  { label: "Preços", href: "#precos" },
  { label: "Blog", href: "#blog-preview" },
];

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const quickMessage = buildWhatsAppUrl(
    "Olá, Íntegra. Quero entender se um produto financeiro que me ofereceram ou que já comprei tem riscos, custos ou conflitos que eu não estou enxergando."
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(216,225,221,0.82)] bg-[rgba(255,255,255,0.92)] backdrop-blur-[20px] saturate-150 shadow-sm"
          : "bg-transparent"
      }`}
      aria-label="Navegação principal"
    >
      <div className="shell">
        <div className="flex min-h-[76px] items-center justify-between gap-7">
          <a className="inline-flex items-center gap-3 font-[780]" href="#top" aria-label="Íntegra Consultoria">
            <span
              className="relative grid w-12 h-12 place-items-center rounded-[var(--radius)] text-[#f6eedc] font-bold text-[31px] leading-none"
              style={{
                border: "1px solid rgba(200,164,93,0.55)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.08), transparent 42%), var(--deep)",
                fontFamily: "Georgia, serif",
                boxShadow: "0 12px 30px rgba(4,16,12,0.16)",
              }}
              aria-hidden="true"
            >
              <span
                className="absolute inset-[6px] rounded-[3px]"
                style={{ border: "1px solid rgba(246,238,220,0.18)" }}
              />
              Í
            </span>
            <span className="grid gap-px leading-none">
              <strong className="text-[20px]" style={{ fontFamily: "Georgia, serif" }}>Íntegra</strong>
              <small className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-[var(--muted-color)]">Consultoria</small>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-[30px] text-[14px] text-[var(--muted-color)]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="relative py-7 pb-[26px] group">
                {link.label}
                <span className="absolute right-0 bottom-[18px] left-0 h-0.5 bg-[var(--accent)] origin-right scale-x-0 transition-transform duration-200 group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            ))}
          </div>

          <a className="button button-primary hidden md:inline-flex text-[14px]" href={quickMessage} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" />Falar agora
          </a>

          <button className="md:hidden p-2 text-[var(--ink)]" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-6 border-t border-[var(--line)] pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-[var(--muted-color)] text-[15px] py-2" onClick={() => setMobileOpen(false)}>{link.label}</a>
              ))}
              <a className="button button-primary mt-2" href={quickMessage} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />Falar agora
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
