update public.services
set name = 'Análise inicial',
    badge = 'Entrada',
    description = 'Primeira leitura técnica para entender o produto, o problema e se há espaço para diagnóstico ou suporte.',
    price_note = 'Triagem paga, objetiva e sem venda de produto financeiro.',
    features = array[
      'Leitura inicial do caso e dos documentos principais.',
      'Indicação do nível de complexidade e próximos passos possíveis.',
      'Sem recomendação de compra de novos ativos.'
    ],
    updated_at = now()
where slug = 'analise-inicial';

update public.services
set name = 'Revisão técnica',
    badge = 'Segunda opinião',
    description = 'Conversa e leitura crítica antes de assinar uma lâmina, aceitar uma proposta ou manter um produto complexo.',
    price_note = '0,1% calculado sobre a carteira ou valor analisado no escopo combinado.',
    features = array[
      'Checklist de riscos, custos e perguntas para banco ou corretora.',
      'Comparação educacional de cenários e premissas.',
      'Registro dos pontos que precisam de confirmação documental.'
    ],
    updated_at = now()
where slug = 'segunda-opiniao';

update public.services
set name = 'Suporte de caso',
    badge = 'Caso assistido',
    description = 'Acompanhamento operacional em FGC, negociação, documentação ou recuperação de valor.',
    price_note = 'Valor variável conforme urgência, documentação, instituição e objetivo.',
    features = array[
      'Organização de documentos e linha do tempo.',
      'Apoio técnico para conversas com instituições.',
      'Integração com advogado quando necessário.'
    ],
    updated_at = now()
where slug = 'suporte-de-caso';
