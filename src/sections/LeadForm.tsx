import { useRef, useEffect, useState } from "react";
import type { FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Landmark, BriefcaseBusiness, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5551999381379";

type LeadForm = {
  name: string;
  phone: string;
  email: string;
  institution: string;
  issueType: string;
  amount: string;
  urgency: string;
  notes: string;
  consent: boolean;
};

const initialForm: LeadForm = {
  name: "", phone: "", email: "", institution: "", issueType: "", amount: "", urgency: "", notes: "", consent: false,
};

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function LeadForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".lead-left", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".lead-left", start: "top 85%", once: true } });
      gsap.fromTo(".lead-form-wrapper", { opacity: 0, x: 50, scale: 0.97 }, { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".lead-form-wrapper", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function updateField<K extends keyof LeadForm>(key: K, value: LeadForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.consent) { alert("Para enviar a triagem, autorize o contato."); return; }
    const website = String(new FormData(event.currentTarget).get("website") || "");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, website }) });
      const result = await response.json().catch(() => ({}));
      setIsSubmitting(false);
      if (!response.ok) { setSubmitStatus(result.error || "Erro ao registrar."); return; }
      const message = ["Olá, Íntegra. Quero iniciar uma triagem.", `Nome: ${form.name}`, `WhatsApp: ${form.phone}`, `E-mail: ${form.email}`, `Instituição: ${form.institution}`, `Tipo: ${form.issueType}`, `Valor: ${form.amount}`, `Urgência: ${form.urgency}`, `Obs: ${form.notes || "Não informado"}`].join("\n");
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      setSubmitStatus("Triagem registrada! Abrimos o WhatsApp.");
      setForm(initialForm);
    } catch { setIsSubmitting(false); setSubmitStatus("Erro de conexão. Tente novamente."); }
  }

  return (
    <section ref={sectionRef} id="triagem" className="relative overflow-hidden" style={{ padding: "104px 0", background: "var(--deep)", color: "#fff" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(90deg, #000, transparent 72%)" }} />
      <div className="shell relative">
        <div className="grid items-start" style={{ gridTemplateColumns: "minmax(0, 0.75fr) minmax(480px, 1.1fr)", gap: "clamp(50px, 9vw, 120px)" }}>
          <div className="lead-left">
            <p className="section-kicker" style={{ color: "rgba(255,255,255,0.7)" }}>Triagem</p>
            <h2 className="section-title text-white">Conte o caso em poucos minutos.</h2>
            <p className="section-copy mt-4" style={{ color: "rgba(255,255,255,0.7)" }}>O formulário monta uma mensagem estruturada para WhatsApp.</p>
            <div className="grid gap-4 mt-8">
              {[{ icon: Landmark, text: "Instituição, tipo de produto e valor aproximado." }, { icon: BriefcaseBusiness, text: "Urgência, documentação disponível e contexto comercial." }, { icon: ShieldCheck, text: "Tratamento de dados apenas para avaliar e responder." }].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 leading-[1.45]" style={{ color: "rgba(255,255,255,0.74)" }}><item.icon size={18} className="flex-shrink-0 text-[var(--mint)]" aria-hidden="true" />{item.text}</div>
              ))}
            </div>
          </div>
          <div className="lead-form-wrapper">
            <form onSubmit={handleSubmit} className="grid gap-4 border rounded-[var(--radius)] bg-white p-7" style={{ borderColor: "rgba(255,255,255,0.12)", color: "var(--ink)", boxShadow: "0 34px 90px rgba(0,0,0,0.22)" }}>
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-[15px]" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
                {[{ id: "name", label: "Nome", type: "text", placeholder: "Seu nome" }, { id: "phone", label: "WhatsApp", type: "text", placeholder: "(11) 99999-9999" }, { id: "email", label: "E-mail", type: "email", placeholder: "voce@email.com" }, { id: "institution", label: "Instituição envolvida", type: "text", placeholder: "Banco, corretora ou emissor" }].map((field) => (
                  <div key={field.id} className="grid gap-[7px]"><label htmlFor={field.id} className="text-[12px] font-extrabold text-[#27352f]">{field.label}</label><input id={field.id} type={field.type} required value={form[field.id as keyof LeadForm] as string} onChange={(e) => updateField(field.id as keyof LeadForm, e.target.value)} placeholder={field.placeholder} className="w-full border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)] px-3.5 py-3 text-[var(--ink)] outline-none transition-all focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(7,155,130,0.13)]" /></div>
                ))}
                <div className="grid gap-[7px]"><label className="text-[12px] font-extrabold text-[#27352f]">Tipo de caso</label><select required value={form.issueType} onChange={(e) => updateField("issueType", e.target.value)} className="w-full border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)] px-3.5 py-3 outline-none transition-all focus:border-[var(--accent)]"><option value="">Selecione</option><option>COE ou produto estruturado</option><option>FGC ou instituição em problema</option><option>Conflito de interesse/rebate</option><option>Segunda opinião antes de assinar</option><option>Outro caso complexo</option></select></div>
                <div className="grid gap-[7px]"><label className="text-[12px] font-extrabold text-[#27352f]">Valor aproximado</label><select required value={form.amount} onChange={(e) => updateField("amount", e.target.value)} className="w-full border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)] px-3.5 py-3 outline-none transition-all focus:border-[var(--accent)]"><option value="">Selecione</option><option>Até R$ 100 mil</option><option>R$ 100 mil a R$ 500 mil</option><option>R$ 500 mil a R$ 1 milhão</option><option>Acima de R$ 1 milhão</option></select></div>
                <div className="grid gap-[7px] col-span-2"><label className="text-[12px] font-extrabold text-[#27352f]">Urgência</label><select required value={form.urgency} onChange={(e) => updateField("urgency", e.target.value)} className="w-full border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)] px-3.5 py-3 outline-none transition-all focus:border-[var(--accent)]"><option value="">Selecione</option><option>Tenho prazo de assinatura ou resposta em até 48h</option><option>Preciso decidir nesta semana</option><option>Quero revisar com calma</option><option>Estou em processo de FGC ou reclamação</option></select></div>
                <div className="grid gap-[7px] col-span-2"><label className="text-[12px] font-extrabold text-[#27352f]">Resumo do problema</label><textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Ex.: comprei um COE em 2023..." className="w-full border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)] px-3.5 py-3 outline-none transition-all focus:border-[var(--accent)] resize-y" style={{ minHeight: "104px" }} /></div>
              </div>
              <label className="grid gap-2.5 text-[12px] leading-[1.5]" style={{ gridTemplateColumns: "18px 1fr", color: "var(--muted-color)" }}><input type="checkbox" checked={form.consent} onChange={(e) => updateField("consent", e.target.checked)} className="mt-0.5 accent-[var(--accent)]" /><span>Autorizo a Íntegra a tratar os dados. Li o <a href="/privacidade" target="_blank" className="font-bold underline underline-offset-2" style={{ color: "var(--accent-dark)" }}>Aviso de Privacidade</a>.</span></label>
              <button className="button button-accent" type="submit" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}><MessageCircle size={18} aria-hidden="true" />{isSubmitting ? "Registrando..." : "Enviar triagem pelo WhatsApp"}</button>
              {submitStatus && <p className="m-0 text-[12px] font-bold" style={{ color: "var(--accent-dark)" }} role="status">{submitStatus}</p>}
              <p className="m-0 text-[11px] leading-[1.5]" style={{ color: "var(--muted-color)" }}>Este formulário não envia documentos sensíveis.</p>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:940px){.shell>div{grid-template-columns:1fr!important}}@media(max-width:660px){.lead-form-wrapper form>div:first-of-type{grid-template-columns:1fr!important}.lead-form-wrapper form .col-span-2{grid-column:auto!important}}`}</style>
    </section>
  );
}
