"use client";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Handshake,
  Landmark,
  LockKeyhole,
  MessageCircle,
  ReceiptText,
  Scale,
  ShieldCheck,
  TriangleAlert
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551999381379";

const services = [
  {
    icon: FileSearch,
    title: "Auditoria de carteira",
    copy:
      "Leitura técnica de COEs, estruturas, prazos, custos implícitos, liquidez e cenários de manutenção ou saída."
  },
  {
    icon: ShieldCheck,
    title: "Apoio em FGC",
    copy:
      "Organização de documentos, conferência de limites e suporte operacional para reduzir ansiedade e retrabalho."
  },
  {
    icon: Scale,
    title: "Conflito de interesse",
    copy:
      "Avaliação de indícios de incentivo comercial, rebate e desalinhamento entre produto oferecido e necessidade do investidor."
  }
];

const steps = [
  ["Triagem", "Entendemos a instituição, produto, valor aproximado, urgência e documentos disponíveis."],
  ["Diagnóstico", "Mapeamos custos, riscos, liquidez, prazos, contraparte e pontos de conflito em linguagem clara."],
  ["Relatório", "Entregamos cenários objetivos, premissas e perguntas certas para negociar com banco ou corretora."],
  ["Suporte", "Apoiamos a execução operacional do próximo passo, sem assumir decisão de investimento pelo cliente."]
];

const contents = [
  {
    title: "COE sem mistério",
    copy:
      "O que olhar antes de aceitar uma estrutura: barreiras, indexadores, liquidez, cenários e custo de oportunidade."
  },
  {
    title: "FGC na prática",
    copy:
      "Quais documentos separar, como interpretar limites e por que o prazo emocional costuma ser diferente do prazo operacional."
  },
  {
    title: "Rebate e incentivo",
    copy:
      "Como comissões e metas comerciais podem distorcer a recomendação apresentada ao investidor."
  }
];

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
  name: "",
  phone: "",
  email: "",
  institution: "",
  issueType: "",
  amount: "",
  urgency: "",
  notes: "",
  consent: false
};

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const quickMessage = useMemo(
    () =>
      buildWhatsAppUrl(
        "Olá, Íntegra. Quero entender se um produto financeiro que me ofereceram ou que já comprei tem riscos, custos ou conflitos que eu não estou enxergando."
      ),
    []
  );

  function updateField<K extends keyof LeadForm>(key: K, value: LeadForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.consent) {
      alert("Para enviar a triagem, autorize o contato e o tratamento dos dados informados.");
      return;
    }

    const website = String(new FormData(event.currentTarget).get("website") || "");
    setIsSubmitting(true);
    setSubmitStatus("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, website })
    });
    const result = await response.json().catch(() => ({}));
    setIsSubmitting(false);
    if (!response.ok) {
      setSubmitStatus(result.error || "Não foi possível registrar sua triagem. Tente novamente.");
      return;
    }

    const message = [
      "Olá, Íntegra. Quero iniciar uma triagem.",
      `Nome: ${form.name}`,
      `WhatsApp: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Instituição: ${form.institution}`,
      `Tipo de caso: ${form.issueType}`,
      `Valor aproximado: ${form.amount}`,
      `Urgência: ${form.urgency}`,
      `Observações: ${form.notes || "Não informado"}`
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSubmitStatus("Triagem registrada. Abrimos o WhatsApp para continuar o atendimento.");
    setForm(initialForm);
  }

  return (
    <main className="page">
      <nav className="nav" aria-label="Navegação principal">
        <div className="shell nav-inner">
          <a className="brand" href="#top" aria-label="Íntegra Consultoria">
            <span className="brand-mark" aria-hidden="true">Í</span>
            <span className="brand-name">
              <strong>Íntegra</strong>
              <small>Consultoria</small>
            </span>
          </a>

          <div className="nav-links">
            <a href="#dores">Dores</a>
            <a href="#metodo">Método</a>
            <a href="#precos">Preços</a>
            <a href="/blog">Blog</a>
          </div>

          <a className="button button-primary" href={quickMessage} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Falar agora
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-monogram" aria-hidden="true">Í</div>
        <div className="shell hero-grid">
          <div>
            <div className="eyebrow">
              <LockKeyhole size={16} aria-hidden="true" />
              Independente, técnico e sem comissão de produto
            </div>
            <h1>Raio-x financeiro para produtos que ninguém explicou direito.</h1>
            <p className="hero-copy">
              A Íntegra traduz COEs, operações estruturadas, FGC e possíveis conflitos de interesse em um
              diagnóstico objetivo, visual e acionável. Sem rebate. Sem venda de produto. Sem empurrar decisão.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href={quickMessage} target="_blank" rel="noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                Começar pelo WhatsApp
              </a>
              <a className="button button-secondary" href="#triagem">
                <ClipboardCheck size={18} aria-hidden="true" />
                Preencher triagem
              </a>
            </div>
            <div className="hero-proof" aria-label="Princípios da Íntegra">
              <div className="proof-item">
                <strong>R$ 129,00</strong>
                <span>Análise inicial para entender se há caso e qual caminho seguir.</span>
              </div>
              <div className="proof-item">
                <strong>Sem call</strong>
                <span>Não recomendamos compra de novos ativos no modelo inicial.</span>
              </div>
              <div className="proof-item">
                <strong>Com método</strong>
                <span>Premissas, cenários, documentos e perguntas de negociação.</span>
              </div>
            </div>
          </div>

          <aside className="diagnostic-board elevated" aria-label="Exemplo de mapa de diagnóstico">
            <div className="board-watermark" aria-hidden="true">Í</div>
            <div className="board-top">
              <span className="board-title">Dossiê Íntegra</span>
              <span className="board-status">
                <BadgeCheck size={16} aria-hidden="true" />
                Independente
              </span>
            </div>
            <div className="board-metric">
              <span>Primeira leitura</span>
              <strong>R$ 129,00</strong>
              <small>triagem técnica do caso</small>
            </div>
            <div className="board-body">
              <div className="scan-row">
                <span className="scan-icon">
                  <ReceiptText size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>Produto e contrato</strong>
                  <span>Lâmina, nota, vencimento, emissor e indexadores.</span>
                </span>
                <span className="scan-tag">Base documental</span>
              </div>
              <div className="scan-row">
                <span className="scan-icon">
                  <TriangleAlert size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>Riscos escondidos</strong>
                  <span>Liquidez, barreiras, derivativos, marcação e custos implícitos.</span>
                </span>
                <span className="scan-tag">Leitura crítica</span>
              </div>
              <div className="scan-row">
                <span className="scan-icon">
                  <Handshake size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>Conflito aparente</strong>
                  <span>Incentivos comerciais e aderência ao perfil declarado.</span>
                </span>
                <span className="scan-tag">Perguntas certas</span>
              </div>
              <div className="board-note">
                A decisão final permanece com o investidor. A Íntegra entrega análise técnica, cenários e suporte operacional.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="dores">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">As dores que curamos</p>
              <h2 className="section-title">Para quem recebeu uma explicação bonita, mas ainda não entendeu o risco.</h2>
            </div>
            <p className="section-copy">
              O foco é separar informação técnica de pressão comercial, sem substituir advogado, contador ou consultor CVM quando o caso exigir.
            </p>
          </div>

          <div className="cards-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.title}>
                  <span className="card-icon">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="metodo">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">Como funciona</p>
              <h2 className="section-title">Um processo curto para transformar ruído em plano de ação.</h2>
            </div>
            <p className="section-copy">
              Você começa com uma análise inicial acessível. Se fizer sentido avançar, o escopo cresce conforme a carteira e a complexidade.
            </p>
          </div>

          <div className="steps">
            {steps.map(([title, copy], index) => (
              <article className="step" key={title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split">
          <div>
            <p className="section-kicker">Independência</p>
            <h2 className="section-title">A autoridade vem justamente do que a Íntegra não vende.</h2>
          </div>

          <div className="principles">
            <div className="principle">
              <CheckCircle2 size={22} aria-hidden="true" />
              <span>
                <strong>Não distribuímos produtos financeiros.</strong>
                <span>A remuneração vem do cliente, por análise, segunda opinião ou suporte em casos específicos.</span>
              </span>
            </div>
            <div className="principle">
              <CheckCircle2 size={22} aria-hidden="true" />
              <span>
                <strong>Não assumimos decisão de investimento.</strong>
                <span>O trabalho mostra cenários, premissas e impactos; a decisão final continua com o cliente.</span>
              </span>
            </div>
            <div className="principle">
              <CheckCircle2 size={22} aria-hidden="true" />
              <span>
                <strong>Não conduzimos litígio jurídico.</strong>
                <span>Quando há disputa formal, atuamos como apoio técnico ao cliente e ao advogado parceiro.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted" id="precos">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">Preços</p>
              <h2 className="section-title">Começo simples, cobrança proporcional quando o caso exige mais profundidade.</h2>
            </div>
            <p className="section-copy">
              A análise inicial serve para qualificar o problema. Suporte posterior depende de volume de documentos, urgência, tipo de instituição e objetivo do cliente.
            </p>
          </div>

          <div className="pricing-grid refined-pricing">
            <article className="pricing-card featured">
              <span className="pricing-label">Entrada</span>
              <h3>Análise inicial</h3>
              <p>Primeira leitura técnica para entender o produto, o problema e se há espaço para diagnóstico ou suporte.</p>
              <div className="price">R$ 129,00</div>
              <span className="price-note">Triagem paga, objetiva e sem venda de produto financeiro.</span>
              <ul>
                <li>Leitura inicial do caso e dos documentos principais.</li>
                <li>Indicação do nível de complexidade e próximos passos possíveis.</li>
                <li>Sem recomendação de compra de novos ativos.</li>
              </ul>
            </article>

            <article className="pricing-card">
              <span className="pricing-label">Segunda opinião</span>
              <h3>Revisão técnica</h3>
              <p>Conversa e leitura crítica antes de assinar uma lâmina, aceitar uma proposta ou manter um produto complexo.</p>
              <div className="price">R$ 300,00 + 0,1%</div>
              <span className="price-note">0,1% calculado sobre a carteira ou valor analisado no escopo combinado.</span>
              <ul>
                <li>Checklist de riscos, custos e perguntas para banco ou corretora.</li>
                <li>Comparação educacional de cenários e premissas.</li>
                <li>Registro dos pontos que precisam de confirmação documental.</li>
              </ul>
            </article>

            <article className="pricing-card">
              <span className="pricing-label">Caso assistido</span>
              <h3>Suporte de caso</h3>
              <p>Acompanhamento operacional em FGC, negociação, documentação ou recuperação de valor.</p>
              <div className="price variable-price">Sob análise</div>
              <span className="price-note">Valor variável conforme urgência, documentação, instituição e objetivo.</span>
              <ul>
                <li>Organização de documentos e linha do tempo.</li>
                <li>Apoio técnico para conversas com instituições.</li>
                <li>Integração com advogado quando necessário.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section lead-band" id="triagem">
        <div className="shell form-wrap">
          <div>
            <p className="section-kicker">Triagem</p>
            <h2 className="section-title">Conte o caso em poucos minutos.</h2>
            <p className="section-copy">
              O formulário monta uma mensagem estruturada para WhatsApp. Assim já sabemos se o caso cabe no diagnóstico e quais documentos pedir.
            </p>
            <div className="lead-list">
              <div>
                <Landmark size={18} aria-hidden="true" />
                Instituição, tipo de produto e valor aproximado.
              </div>
              <div>
                <BriefcaseBusiness size={18} aria-hidden="true" />
                Urgência, documentação disponível e contexto comercial.
              </div>
              <div>
                <ShieldCheck size={18} aria-hidden="true" />
                Tratamento de dados apenas para avaliar e responder sua solicitação.
              </div>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="field-grid">
              <div className="field">
                <label htmlFor="name">Nome</label>
                <input id="name" required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Seu nome" />
              </div>
              <div className="field">
                <label htmlFor="phone">WhatsApp</label>
                <input id="phone" required value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="(11) 99999-9999" />
              </div>
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" required value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="voce@email.com" />
              </div>
              <div className="field">
                <label htmlFor="institution">Instituição envolvida</label>
                <input id="institution" required value={form.institution} onChange={(event) => updateField("institution", event.target.value)} placeholder="Banco, corretora ou emissor" />
              </div>
              <div className="field">
                <label htmlFor="issueType">Tipo de caso</label>
                <select id="issueType" required value={form.issueType} onChange={(event) => updateField("issueType", event.target.value)}>
                  <option value="">Selecione</option>
                  <option>COE ou produto estruturado</option>
                  <option>FGC ou instituição em problema</option>
                  <option>Conflito de interesse/rebate</option>
                  <option>Segunda opinião antes de assinar</option>
                  <option>Outro caso complexo</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="amount">Valor aproximado</label>
                <select id="amount" required value={form.amount} onChange={(event) => updateField("amount", event.target.value)}>
                  <option value="">Selecione</option>
                  <option>Até R$ 100 mil</option>
                  <option>R$ 100 mil a R$ 500 mil</option>
                  <option>R$ 500 mil a R$ 1 milhão</option>
                  <option>Acima de R$ 1 milhão</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="urgency">Urgência</label>
                <select id="urgency" required value={form.urgency} onChange={(event) => updateField("urgency", event.target.value)}>
                  <option value="">Selecione</option>
                  <option>Tenho prazo de assinatura ou resposta em até 48h</option>
                  <option>Preciso decidir nesta semana</option>
                  <option>Quero revisar com calma</option>
                  <option>Estou em processo de FGC ou reclamação</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="notes">Resumo do problema</label>
                <textarea id="notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="Ex.: comprei um COE em 2023, não entendi a liquidez e quero saber se há custo de oportunidade ou conflito." />
              </div>
            </div>

            <label className="check-field">
              <input type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} />
              <span>Autorizo a Íntegra a tratar os dados informados para avaliar e responder esta solicitação. Li o <a href="/privacidade" target="_blank">Aviso de Privacidade</a>.</span>
            </label>

            <button className="button button-accent" type="submit" disabled={isSubmitting}>
              <MessageCircle size={18} aria-hidden="true" />
              {isSubmitting ? "Registrando triagem..." : "Enviar triagem pelo WhatsApp"}
            </button>
            {submitStatus && <p className="form-status" role="status">{submitStatus}</p>}
            <p className="form-note">
              Este formulário não envia documentos sensíveis. O compartilhamento de lâminas, notas e extratos deve ocorrer apenas após orientação inicial.
            </p>
          </form>
        </div>
      </section>

      <section className="section" id="blog-preview">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">Escudo do Investidor</p>
              <h2 className="section-title">Um blog para investir com mais defesa e menos ruído.</h2>
            </div>
            <p className="section-copy">
              Artigos curtos e diretos sobre COE, FGC, conflito de interesse, rebate e produtos financeiros difíceis de entender.
            </p>
          </div>

          <div className="content-grid">
            {contents.map((content) => (
              <article className="content-card" key={content.title}>
                <h3>{content.title}</h3>
                <p>{content.copy}</p>
                <a href="#triagem">
                  Quero analisar meu caso
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">FAQ regulatório</p>
              <h2 className="section-title">Limites claros desde a primeira conversa.</h2>
            </div>
          </div>

          <div className="faq-grid">
            <article className="faq-item">
              <h3>A Íntegra recomenda onde investir depois?</h3>
              <p>No modelo inicial, não. A atuação é diagnóstico, educação técnica, análise de custos, riscos, conflitos e suporte operacional.</p>
            </article>
            <article className="faq-item">
              <h3>Vocês substituem advogado?</h3>
              <p>Não. Reclamações formais, indenização e litígio devem ser conduzidos por advogado. Podemos apoiar tecnicamente o caso.</p>
            </article>
            <article className="faq-item">
              <h3>Vocês recebem comissão de banco ou corretora?</h3>
              <p>Não. O modelo comercial é fee pago pelo cliente e, em casos elegíveis, taxa de sucesso sobre valor recuperado ou economizado.</p>
            </article>
            <article className="faq-item">
              <h3>O relatório manda vender ou manter?</h3>
              <p>O relatório apresenta cenários, premissas e consequências financeiras. A decisão final permanece com o investidor.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-grid">
          <div>
            <strong>Íntegra Consultoria</strong>
            Diagnóstico independente para produtos financeiros complexos.
          </div>
          <div>
            <a href="/privacidade" className="footer-privacy">Aviso de Privacidade</a><br/>
            A Íntegra não distribui produtos financeiros, não recebe rebate de instituições e não presta, no modelo inicial, recomendação personalizada de compra de valores mobiliários. Antes da publicação, os textos comerciais devem ser revisados por assessoria jurídica/regulatória.
          </div>
        </div>
      </footer>
    </main>
  );
}
