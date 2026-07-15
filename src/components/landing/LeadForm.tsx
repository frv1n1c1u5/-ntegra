"use client";

import { useRef, useEffect, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Landmark, BriefcaseBusiness, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551999381379";

type FormData = {
  name: string; phone: string; email: string; institution: string;
  issueType: string; amount: string; urgency: string; notes: string; consent: boolean;
};

const initialForm: FormData = {
  name: "", phone: "", email: "", institution: "", issueType: "",
  amount: "", urgency: "", notes: "", consent: false,
};

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function LeadForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".lead-left", { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".lead-left", start: "top 85%", once: true },
      });
      gsap.fromTo(".lead-form", { opacity: 0, x: 50, scale: 0.97 }, {
        opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".lead-form", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.consent) { alert("Para enviar a triagem, autorize o contato."); return; }
    const website = String(new FormData(event.currentTarget).get("website") || "");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const result = await response.json().catch(() => ({}));
      setIsSubmitting(false);
      if (!response.ok) { setSubmitStatus(result.error || "Erro ao registrar."); return; }
      const message = [
        "Olá, Íntegra. Quero iniciar uma triagem.", `Nome: ${form.name}`, `WhatsApp: ${form.phone}`,
        `E-mail: ${form.email}`, `Instituição: ${form.institution}`, `Tipo: ${form.issueType}`,
        `Valor: ${form.amount}`, `Urgência: ${form.urgency}`, `Obs: ${form.notes || "Não informado"}`,
      ].join("\n");
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      setSubmitStatus("Triagem registrada! Abrimos o WhatsApp.");
      setForm(initialForm);
    } catch { setIsSubmitting(false); setSubmitStatus("Erro de conexão. Tente novamente."); }
  }

  return (
    <section ref={sectionRef} id="triagem" className="section lead-band">
      <div className="shell">
        <div className="form-wrap">
          <div className="lead-left">
            <p className="section-kicker">Triagem</p>
            <h2 className="section-title">Conte o caso em poucos minutos.</h2>
            <p className="section-copy">
              O formulário monta uma mensagem estruturada para WhatsApp. Assim já sabemos se o caso cabe no diagnóstico e quais documentos pedir.
            </p>
            <div className="lead-list">
              {[{ icon: Landmark, text: "Instituição, tipo de produto e valor aproximado." }, { icon: BriefcaseBusiness, text: "Urgência, documentação disponível e contexto comercial." }, { icon: ShieldCheck, text: "Tratamento de dados apenas para avaliar e responder sua solicitação." }].map((item, i) => (
                <div key={i}><item.icon size={18} aria-hidden="true" />{item.text}</div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lead-form">
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="field-grid">
              {[{ id: "name", label: "Nome", ph: "Seu nome" }, { id: "phone", label: "WhatsApp", ph: "(11) 99999-9999" }, { id: "email", label: "E-mail", ph: "voce@email.com", type: "email" }, { id: "institution", label: "Instituição envolvida", ph: "Banco, corretora ou emissor" }].map((f) => (
                <div key={f.id} className="field">
                  <label htmlFor={f.id}>{f.label}</label>
                  <input id={f.id} type={f.type || "text"} required value={form[f.id as keyof FormData] as string} onChange={(e) => updateField(f.id as keyof FormData, e.target.value)} placeholder={f.ph} />
                </div>
              ))}
              <div className="field">
                <label>Tipo de caso</label>
                <select required value={form.issueType} onChange={(e) => updateField("issueType", e.target.value)}>
                  <option value="">Selecione</option>
                  <option>COE ou produto estruturado</option>
                  <option>FGC ou instituição em problema</option>
                  <option>Conflito de interesse/rebate</option>
                  <option>Segunda opinião antes de assinar</option>
                  <option>Outro caso complexo</option>
                </select>
              </div>
              <div className="field">
                <label>Valor aproximado</label>
                <select required value={form.amount} onChange={(e) => updateField("amount", e.target.value)}>
                  <option value="">Selecione</option>
                  <option>Até R$ 100 mil</option>
                  <option>R$ 100 mil a R$ 500 mil</option>
                  <option>R$ 500 mil a R$ 1 milhão</option>
                  <option>Acima de R$ 1 milhão</option>
                </select>
              </div>
              <div className="field full">
                <label>Urgência</label>
                <select required value={form.urgency} onChange={(e) => updateField("urgency", e.target.value)}>
                  <option value="">Selecione</option>
                  <option>Tenho prazo de assinatura ou resposta em até 48h</option>
                  <option>Preciso decidir nesta semana</option>
                  <option>Quero revisar com calma</option>
                  <option>Estou em processo de FGC ou reclamação</option>
                </select>
              </div>
              <div className="field full">
                <label>Resumo do problema</label>
                <textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Ex.: comprei um COE em 2023, não entendi a liquidez e quero saber se há custo de oportunidade ou conflito." />
              </div>
            </div>
            <label className="check-field">
              <input type="checkbox" checked={form.consent} onChange={(e) => updateField("consent", e.target.checked)} />
              <span>Autorizo a Íntegra a tratar os dados informados para avaliar e responder esta solicitação. Li o <a href="/privacidade" target="_blank">Aviso de Privacidade</a>.</span>
            </label>
            <button className="button button-accent" type="submit" disabled={isSubmitting}>
              <MessageCircle size={18} aria-hidden="true" />
              {isSubmitting ? "Registrando..." : "Enviar triagem pelo WhatsApp"}
            </button>
            {submitStatus && <p className="form-status" role="status">{submitStatus}</p>}
            <p className="form-note">Este formulário não envia documentos sensíveis. O compartilhamento de lâminas, notas e extratos deve ocorrer apenas após orientação inicial.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
