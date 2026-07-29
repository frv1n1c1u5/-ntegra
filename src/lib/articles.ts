export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  intro: string[];
  sections: ArticleSection[];
  sources: { label: string; href: string }[];
};

export const articles: Article[] = [
  {
    slug: "coe-perguntas-antes-de-assinar",
    category: "COE",
    title: "COE: 9 perguntas para fazer antes de assinar",
    description:
      "Um checklist para entender proteção do capital, cenários, barreiras, liquidez, custos e riscos antes de investir em um COE.",
    image: "/images/blog/coe-perguntas-capa.webp",
    imageAlt:
      "Ilustração abstrata de trajetórias financeiras que se dividem em diferentes cenários",
    readTime: "9 min",
    publishedAt: "2026-07-29",
    updatedAt: "29 de julho de 2026",
    intro: [
      "O Certificado de Operações Estruturadas combina elementos de renda fixa e derivativos em um único título emitido por uma instituição financeira. A promessa comercial costuma caber em uma frase; o resultado real depende de uma sequência de condições.",
      "Antes de olhar apenas para o ganho possível, procure entender o caminho inteiro: quem deve o dinheiro, o que precisa acontecer, em quais datas, quanto você pode receber e o que ocorre se precisar sair antes."
    ],
    sections: [
      {
        heading: "1. O capital é protegido em qual situação?",
        paragraphs: [
          "“Capital protegido” normalmente descreve o valor a receber no vencimento segundo as regras da estrutura. Não significa ausência de risco. Existe risco de crédito do emissor, e uma venda antecipada pode ocorrer por valor inferior ao investido.",
          "Peça que a proteção seja descrita por escrito: ela vale apenas no vencimento? Abrange todo o valor aplicado? Há eventos que alteram a regra?"
        ]
      },
      {
        heading: "2. Quem é o emissor e qual risco estou assumindo?",
        paragraphs: [
          "O COE é uma obrigação do banco emissor. Por isso, analisar apenas o ativo de referência — dólar, índice, ação ou cesta — deixa uma parte importante do risco fora da conversa.",
          "Pergunte quem emite o certificado, qual é o prazo e como a exposição se encaixa no restante do seu patrimônio. COE não aparece entre os produtos cobertos pela garantia ordinária do FGC."
        ]
      },
      {
        heading: "3. Qual é exatamente a regra de remuneração?",
        paragraphs: [
          "Transforme a explicação comercial em uma fórmula compreensível. Identifique o ativo de referência, a data inicial, as datas de observação, a data final, a participação na alta ou na queda e a moeda usada no cálculo.",
          "Se a estrutura não puder ser explicada com um exemplo de resultado favorável, um neutro e um desfavorável, ela ainda não está clara o suficiente."
        ]
      },
      {
        heading: "4. Existem barreiras ou condições intermediárias?",
        paragraphs: [
          "Alguns produtos dependem de barreiras observadas continuamente; outros olham apenas datas específicas. Uma única passagem por determinado nível pode mudar o resultado, mesmo que o ativo termine em outro patamar.",
          "Pergunte quando a barreira é observada, qual fonte de preço é usada e o que acontece se ela for tocada."
        ]
      },
      {
        heading: "5. Existe limite para o ganho?",
        paragraphs: [
          "Muitos COEs limitam a valorização por meio de teto, participação parcial ou remuneração máxima. Assim, o investidor pode assumir a iliquidez de vários anos sem capturar toda a alta do ativo de referência.",
          "Compare o retorno máximo líquido e anualizado com alternativas mais simples de prazo e risco semelhantes."
        ]
      },
      {
        heading: "6. Qual é o pior resultado possível?",
        paragraphs: [
          "Peça números, não adjetivos. Em estruturas de valor nominal protegido, o pior cenário contratual no vencimento pode ser receber apenas o principal — o que ainda representa perda de poder de compra e custo de oportunidade. Em estruturas de valor nominal em risco, pode haver perda do capital.",
          "Inclua na análise o cenário de insolvência do emissor e a necessidade de venda antecipada."
        ]
      },
      {
        heading: "7. Há liquidez antes do vencimento?",
        paragraphs: [
          "Ter uma cotação de saída não equivale a ter liquidez garantida. O preço pode refletir juros, volatilidade, crédito do emissor, prazo restante e condições de mercado.",
          "Pergunte quem recompra, com que frequência há preço, se existe spread e se há histórico ou exemplo de marcação a mercado."
        ]
      },
      {
        heading: "8. Quanto a instituição e o profissional recebem?",
        paragraphs: [
          "Custos e incentivos podem estar embutidos na estrutura. A regulamentação da CVM exige transparência sobre a forma de remuneração e, conforme o caso, valores ou percentuais no ambiente da operação.",
          "Peça a remuneração total da distribuição e pergunte se existe alternativa sem incentivo semelhante. Comissão não prova inadequação por si só, mas é informação relevante para avaliar o conselho recebido."
        ]
      },
      {
        heading: "9. O produto combina com meu objetivo e meu prazo?",
        paragraphs: [
          "Uma estrutura pode funcionar como desenhada e ainda ser inadequada para a necessidade do investidor. Reserva de emergência, compromisso de curto prazo e patrimônio concentrado pedem atenção especial.",
          "Confira se o perfil de risco está atualizado e se a recomendação considera objetivo, capacidade de perda, horizonte e conhecimento do produto."
        ]
      },
      {
        heading: "Checklist antes do aceite",
        paragraphs: [
          "Guarde a versão dos documentos recebidos e registre as respostas. O Documento de Informações Essenciais, o termo de ciência de risco e o material da oferta devem contar a mesma história."
        ],
        bullets: [
          "Emissor, vencimento e risco de crédito identificados.",
          "Regra de cálculo e datas de observação compreendidas.",
          "Três cenários simulados com valores líquidos.",
          "Ganho máximo, perda possível e custo de oportunidade comparados.",
          "Condições e preço de saída antecipada documentados.",
          "Remuneração do distribuidor informada.",
          "Adequação ao objetivo e ao prazo confirmada."
        ],
        note:
          "Regra prática: se você não consegue explicar o produto sem repetir o material comercial, ainda falta informação para decidir."
      }
    ],
    sources: [
      {
        label: "B3 — Certificado de Operações Estruturadas (COE)",
        href: "https://www.b3.com.br/pt_br/produtos-e-servicos/registro/operacoes-estruturadas/certificado-de-operacoes-estruturadas-coe.htm"
      },
      {
        label: "CVM — Resolução CVM 30 (suitability)",
        href: "https://www.gov.br/cvm/pt-br/assuntos/noticias/2021/cvm-publica-novas-resolucoes-sobre-sandbox-regulatorio-e-suitability"
      },
      {
        label: "CVM — Resolução CVM 179 consolidada",
        href: "https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/legislacao/resolucoes/anexos/100/resol179consolid.pdf"
      },
      {
        label: "FGC — Produtos cobertos e limites da garantia",
        href: "https://fgc.org.br/pt/home-fgc"
      }
    ]
  },
  {
    slug: "rebate-comissao-intermediario",
    category: "Conflito de interesse",
    title: "Rebate e comissão: como descobrir quanto o intermediário recebeu",
    description:
      "Onde encontrar a remuneração da corretora ou do assessor, como interpretar os valores e quais perguntas fazer antes de investir.",
    image: "/images/blog/rebate-comissao-capa.webp",
    imageAlt:
      "Ilustração abstrata de um fluxo financeiro que se divide e revela uma rota secundária",
    readTime: "8 min",
    publishedAt: "2026-07-29",
    updatedAt: "29 de julho de 2026",
    intro: [
      "Quando um produto é distribuído, a instituição e os profissionais envolvidos podem ser remunerados de diferentes formas: comissão, percentual da taxa de administração, spread, remuneração recorrente ou outra vantagem econômica.",
      "O nome muda conforme o produto e o modelo comercial. A pergunta essencial permanece: quem recebe, quanto recebe e se esse incentivo pode influenciar a recomendação."
    ],
    sections: [
      {
        heading: "Comissão não é sinônimo automático de abuso",
        paragraphs: [
          "A existência de remuneração não torna uma operação inadequada. Distribuição e aconselhamento têm custos. O problema surge quando o incentivo é ocultado, minimizado ou passa a orientar uma recomendação incompatível com o interesse e o perfil do cliente.",
          "A análise responsável combina três elementos: transparência da remuneração, adequação do produto e qualidade das alternativas apresentadas."
        ]
      },
      {
        heading: "Onde procurar a informação",
        paragraphs: [
          "A Resolução CVM 179 reforçou o dever de informar a forma de remuneração e os potenciais conflitos de interesse. Desde novembro de 2024, as regras de transparência alcançam informações apresentadas no ambiente da operação e extratos periódicos.",
          "Na prática, procure em três lugares:"
        ],
        bullets: [
          "No site da instituição: política de remuneração, conflitos de interesse e critérios de distribuição.",
          "Na tela ou documento da ordem: valor ou percentual da remuneração e, quando aplicável, estimativa de spread.",
          "No extrato trimestral: remuneração total recebida, modalidade, natureza do pagamento e parcela destinada ao assessor."
        ]
      },
      {
        heading: "Leia o extrato como uma trilha, não como uma sentença",
        paragraphs: [
          "O extrato ajuda a localizar incentivos, mas um número isolado não explica toda a recomendação. Compare a remuneração entre produtos sugeridos, observe recorrência e confronte o valor com prazo, risco e complexidade.",
          "Uma comissão maior merece uma explicação mais robusta quando havia alternativas comparáveis, mais simples ou mais líquidas."
        ]
      },
      {
        heading: "Seis perguntas que melhoram a conversa",
        paragraphs: [
          "Faça perguntas curtas e peça respostas por escrito. Isso reduz ambiguidades e cria um registro útil para revisar a decisão."
        ],
        bullets: [
          "Qual é a remuneração total desta operação, em reais e em percentual?",
          "Quanto fica com a instituição e quanto é destinado ao assessor?",
          "A remuneração é paga uma vez ou continua ao longo do tempo?",
          "Existe spread entre o preço adquirido e o preço oferecido a mim?",
          "Quais alternativas comparáveis pagam menos ao distribuidor?",
          "Por que esta opção é mais adequada ao meu objetivo, apesar do incentivo?"
        ]
      },
      {
        heading: "Um exemplo simples",
        paragraphs: [
          "Imagine duas alternativas com prazo e risco semelhantes. A primeira remunera o distribuidor em R$ 400; a segunda, em R$ 2.000. Essa diferença não prova que a segunda seja ruim, mas cria uma pergunta objetiva: qual característica adicional justifica a escolha para o cliente?",
          "A resposta deveria falar de risco, retorno, liquidez, tributação e objetivo — não apenas de uma campanha, escassez da oferta ou expectativa genérica de mercado."
        ]
      },
      {
        heading: "Sinais de alerta",
        paragraphs: [
          "Alguns comportamentos justificam uma segunda leitura cuidadosa da documentação."
        ],
        bullets: [
          "Pressão para decidir antes de receber os documentos.",
          "Resistência em informar remuneração em reais.",
          "Ênfase no cenário positivo sem comparação com alternativas.",
          "Trocas frequentes de produto sem ganho claro para o cliente.",
          "Perfil de investidor desatualizado ou preenchido de forma incompatível com a realidade.",
          "Explicações diferentes entre a conversa, a lâmina e o extrato."
        ]
      },
      {
        heading: "Como documentar sem transformar tudo em confronto",
        paragraphs: [
          "Baixe o extrato, salve a ordem, a lâmina e as mensagens relevantes. Em seguida, peça uma memória simples da recomendação: objetivo, alternativas comparadas, riscos e remuneração.",
          "A intenção é reconstruir a decisão com fatos. Se as informações continuarem incompletas, utilize primeiro o canal de atendimento e a ouvidoria da instituição. A CVM também mantém canal para consultas, reclamações e denúncias dentro de sua competência."
        ],
        note:
          "Transparência não elimina conflitos de interesse; ela permite que o investidor os enxergue e faça perguntas melhores."
      }
    ],
    sources: [
      {
        label: "CVM — Resolução CVM 179 consolidada",
        href: "https://conteudo.cvm.gov.br/cvm_institucional/export/sites/cvm/legislacao/resolucoes/anexos/100/resol179consolid.pdf"
      },
      {
        label: "CVM — Entrada em vigor das regras de transparência",
        href: "https://www.gov.br/cvm/pt-br/assuntos/noticias/2023/cvm-prorroga-entrada-em-vigor-de-dispositivos-da-resolucao-179/"
      },
      {
        label: "CVM — Marco regulatório do assessor de investimento",
        href: "https://www.gov.br/cvm/pt-br/assuntos/noticias/2023/cvm-edita-marco-regulatorio-para-atividade-de-assessor-de-investimento"
      },
      {
        label: "CVM — Serviço de Atendimento ao Cidadão",
        href: "https://www.gov.br/cvm/pt-br/canais_atendimento/consultas-reclamacoes-denuncias/sac"
      }
    ]
  },
  {
    slug: "fgc-limites-conglomerado-quatro-anos",
    category: "FGC",
    title: "FGC sem confusão: limite, conglomerado e teto de quatro anos",
    description:
      "Entenda o limite de R$ 250 mil, a regra por conglomerado, o teto de R$ 1 milhão em quatro anos e quais produtos são cobertos.",
    image: "/images/blog/fgc-limites-capa.webp",
    imageAlt:
      "Ilustração abstrata de diferentes depósitos agrupados sob uma proteção transparente",
    readTime: "8 min",
    publishedAt: "2026-07-29",
    updatedAt: "29 de julho de 2026",
    intro: [
      "A garantia do Fundo Garantidor de Créditos é uma proteção importante, mas não é ilimitada e não se aplica a qualquer investimento. Para usá-la no planejamento, é preciso observar titular, produto, instituição ou conglomerado e ocorrências anteriores.",
      "As regras abaixo resumem a garantia ordinária vigente na data de revisão deste artigo. Antes de uma decisão, confirme as condições no FGC."
    ],
    sections: [
      {
        heading: "A regra central: R$ 250 mil",
        paragraphs: [
          "A cobertura ordinária é limitada a R$ 250 mil por CPF ou CNPJ contra a mesma instituição associada — ou contra todas as instituições do mesmo conglomerado financeiro.",
          "O cálculo considera os créditos cobertos do titular, incluindo principal e rendimentos reconhecidos até a data do evento, respeitado o limite."
        ]
      },
      {
        heading: "Duas marcas do mesmo grupo não criam dois limites",
        paragraphs: [
          "Se duas instituições pertencem ao mesmo conglomerado, os valores cobertos são somados. Ter R$ 180 mil em uma e R$ 120 mil em outra não produz R$ 300 mil de garantia: o teto conjunto continua em R$ 250 mil.",
          "Por isso, diversificar nomes na tela do aplicativo não basta. É necessário verificar o grupo financeiro ao qual cada instituição pertence."
        ]
      },
      {
        heading: "Existe também um teto de R$ 1 milhão em quatro anos",
        paragraphs: [
          "Para garantias pagas por eventos ocorridos a partir de 22 de dezembro de 2017, o total recebido pelo mesmo CPF ou CNPJ fica limitado a R$ 1 milhão em um período de quatro anos.",
          "Esse teto é separado da regra de R$ 250 mil por instituição ou conglomerado. Na prática, os dois limites precisam ser observados ao mesmo tempo."
        ]
      },
      {
        heading: "Exemplos rápidos",
        paragraphs: [
          "Cenário A: um titular possui R$ 280 mil em créditos cobertos de um único banco. O limite ordinário é R$ 250 mil.",
          "Cenário B: o titular possui R$ 150 mil no Banco A e R$ 140 mil no Banco B, pertencentes ao mesmo conglomerado. O limite conjunto é R$ 250 mil.",
          "Cenário C: os mesmos valores estão em instituições de conglomerados distintos e ambos os produtos são cobertos. Cada conglomerado tem seu próprio limite de R$ 250 mil, sujeito ao teto global de quatro anos."
        ],
        note:
          "Os exemplos são simplificados. Titularidade, produto, saldo reconhecido e relação entre instituições podem alterar o cálculo."
      },
      {
        heading: "Quais produtos costumam ser cobertos",
        paragraphs: [
          "Entre os créditos listados pelo FGC estão conta-corrente, poupança, CDB, RDB, LCI e LCA, além de outros instrumentos específicos. A cobertura depende das condições do regulamento."
        ],
        bullets: [
          "Depósitos à vista e valores em conta-corrente.",
          "Depósitos de poupança.",
          "CDB e RDB.",
          "LCI e LCA.",
          "Letras de câmbio, hipotecárias e imobiliárias, nas hipóteses previstas."
        ]
      },
      {
        heading: "O que não deve ser presumido como coberto",
        paragraphs: [
          "Fundos de investimento, ações, debêntures, CRI, CRA e COE não integram a lista ordinária de produtos garantidos. Títulos públicos também não dependem do FGC, pois têm outra natureza de risco.",
          "Não use apenas a etiqueta “renda fixa” para concluir que existe garantia. Confirme o instrumento e o emissor."
        ]
      },
      {
        heading: "Como o pagamento acontece",
        paragraphs: [
          "Após o evento que aciona a garantia, o liquidante ou interventor prepara a relação de credores. O FGC depende dessas informações para habilitar o processo. O titular realiza os procedimentos pelos canais oficiais, que podem incluir o aplicativo do FGC.",
          "Não existe prazo universal que possa ser prometido antes da consolidação dos dados. Mantenha cadastro e documentos atualizados e acompanhe somente comunicados oficiais."
        ]
      },
      {
        heading: "Checklist preventivo",
        paragraphs: [
          "O melhor momento para organizar a proteção é antes de um problema com a instituição."
        ],
        bullets: [
          "Liste produtos, saldos, emissores e vencimentos.",
          "Some principal e rendimentos dentro de cada conglomerado.",
          "Confirme se cada produto consta na relação oficial de créditos cobertos.",
          "Registre garantias recebidas nos quatro anos anteriores.",
          "Guarde extratos, notas, contratos e comprovantes de titularidade.",
          "Revise os limites quando os rendimentos aproximarem o saldo de R$ 250 mil."
        ],
        note:
          "FGC é uma rede de proteção, não um substituto para diversificação, liquidez e análise de risco do emissor."
      }
    ],
    sources: [
      {
        label: "FGC — Cobertura, limites e produtos garantidos",
        href: "https://fgc.org.br/pt/home-fgc"
      },
      {
        label: "FGC — Material de apoio ao atendimento (2025)",
        href: "https://www.fgc.org.br/documents/32230/331890/FGC_Material%2Bde%2Bapoio%2Bao%2Batendimento.pdf/e16f4b31-971b-1d60-62e2-1aa8d46eec74?download=true&t=1756822771221&version=1.0"
      }
    ]
  }
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
