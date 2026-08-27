import { ArrowUpRight, Clock3, FileText, ShieldCheck } from "lucide-react";

const included = ["Leitura do material que você já tem em mãos.", "Mapa dos riscos, custos, liquidez, prazos e pontos de atenção.", "Perguntas objetivas para levar à instituição ou ao assessor."];
const excluded = ["Recomendação personalizada de compra ou venda.", "Parecer jurídico, perícia, defesa administrativa ou litígio.", "Promessa de resultado, recuperação ou rentabilidade."];

export default function ExpressDossier() {
  return (
    <section className="editorial-section dossier-section" id="dossie" aria-labelledby="dossier-title">
      <div className="shell">
        <div className="dossier-topline">
          <p className="editorial-kicker">A primeira entrega</p>
          <span>Clareza para a próxima conversa</span>
        </div>
        <div className="dossier-grid">
          <div className="dossier-offer">
            <p className="dossier-number">01</p>
            <h2 id="dossier-title">Dossiê<br />Expresso</h2>
            <p>Uma análise inicial com escopo fechado para você entender o que importa antes de seguir adiante.</p>
            <div className="dossier-price"><strong>R$ 229</strong><span>pagamento único</span></div>
          </div>
          <div className="dossier-details">
            <div className="dossier-promise"><Clock3 size={22} aria-hidden="true" /><span><strong>Em até 48h</strong> após recebermos as informações necessárias para a análise.</span></div>
            <div className="dossier-lists">
              <article><span className="dossier-list-title"><FileText size={17} aria-hidden="true" /> Inclui</span><ul>{included.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><span className="dossier-list-title"><ShieldCheck size={17} aria-hidden="true" /> Não inclui</span><ul>{excluded.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>
            <a href="#contato" className="editorial-text-link">Ver o próximo passo <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
