import { Check, Minus } from "lucide-react";

const rightFit = [
  "Você recebeu ou já comprou um produto e quer entender a mecânica antes de agir.",
  "Você busca uma segunda leitura sem incentivo de distribuição ou rebate.",
  "Você valoriza uma resposta objetiva, com premissas, limites e próximos passos.",
];

const wrongFit = [
  "Você procura indicação de ativos, carteira recomendada ou execução de ordens.",
  "Você precisa de parecer jurídico, perícia ou defesa em litígio neste momento.",
  "Você espera promessa de rentabilidade, recuperação ou resultado garantido.",
];

export default function AudienceFit() {
  return (
    <section className="editorial-section audience-section" aria-labelledby="audience-title">
      <div className="shell audience-grid">
        <div className="editorial-statement">
          <p className="editorial-kicker">Critério antes de urgência</p>
          <h2 id="audience-title">Nem toda dúvida financeira pede mais informação. Algumas pedem uma leitura independente.</h2>
          <p>O Dossiê Expresso é deliberadamente específico: ele existe para reduzir ruído quando há uma decisão próxima, um produto complexo ou uma explicação comercial insuficiente.</p>
        </div>
        <div className="fit-columns">
          <article className="fit-card fit-card-positive">
            <span className="fit-label"><Check size={16} aria-hidden="true" /> Faz sentido se</span>
            <ul>{rightFit.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="fit-card">
            <span className="fit-label"><Minus size={16} aria-hidden="true" /> Não é para você se</span>
            <ul>{wrongFit.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}
