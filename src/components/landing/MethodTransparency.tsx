const steps = [
  ["Contexto", "Produto, instituição, prazo, documentação disponível e a decisão que está em jogo."],
  ["Leitura", "Mecânica, custos, liquidez, contraparte, cenários e incentivos comerciais visíveis."],
  ["Síntese", "Um dossiê direto: o que é fato, o que é hipótese e o que vale perguntar antes de decidir."],
];

export default function MethodTransparency() {
  return (
    <section className="editorial-section transparency-section" id="metodo" aria-labelledby="method-title">
      <div className="shell transparency-grid">
        <div>
          <p className="editorial-kicker">Método e transparência</p>
          <h2 id="method-title">A independência não é um slogan. É o desenho do trabalho.</h2>
          <p className="transparency-copy">A Íntegra não distribui produtos financeiros nem recebe comissão ou rebate. O pagamento vem de quem contrata a análise, e o dossiê deixa explícitos escopo, premissas e limites.</p>
        </div>
        <ol className="editorial-steps">
          {steps.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
