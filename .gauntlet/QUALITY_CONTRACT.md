# Íntegra — Modern Minimal Redesign — Quality Contract

## GOAL
Transformar a landing e as páginas públicas da Íntegra Consultoria em uma identidade
**modern minimal light** (referência Linear/Vercel/Stripe-docs): tipografia sem serifa,
fundo quase branco, bordas hairline, um acento sóbrio, hierarquia por espaço negativo e
tipografia, mantendo a conversão via WhatsApp e o Dossiê Expresso (R$ 229 / 48h) como
objeto central.

## TRANSFORMATION DELTA (obrigatório)
A mudança não pode ser apenas recolor. A composição, hierarquia, densidade e modelo de
interação precisam ficar inconfundíveis em relação à baseline editorial (serifa Georgia,
fundo verde-escuro, creme/dourado):
- Hero claro (não escuro), tipografia display sem serifa com tracking apertado, sem monograma serifado gigante;
- Navegação frosted clara e enxuta, CTA primário com acento único;
- Cartões com borda hairline e sombras discretas; raio generoso;
- Preços com numerais tabulares (tnum) e hierarquia de preço limpa;
- Método numerado em lista minimalista; FAQ com divisórias hairline;
- Formulário de triagem com campos claros, foco visível e layout moderno.

## SUCCESS CRITERIA
- Primeira dobra explica serviço, independência, preço, prazo e CTA em <5s.
- Landmark: desktop e mobile com identidade claramente moderna-minimal (verificável por screenshots + DOM).
- Conversão preservada: CTAs WhatsApp com UTM/origem (trackConversion) intactos.
- Acessibilidade: contraste AA, foco visível, reduced-motion respeitado, navegação por teclado.
- Todas as rotas públicas (/, /precos, /como-funciona, /solucoes, /blog, /blog/[slug], /privacidade, auth) consistentes e funcionando.
- Build de produção, lint e typecheck limpos. Sem erros de console.
- Conteúdo crítico legível sem JavaScript (SSR/Next).
- od lint (anti-slop) sem P0/P1 nas páginas principais.

## QUALITY BAR
- Crítico independente deve classificar o resultado como **impressive** (não apenas funcional ou "nice").
- Referências: modern-minimal direction do OpenDesign (Linear/Vercel), web-design-guidelines (Vercel), frontend-design skill.
- Lighthouse mobile >= 90 em Performance/Accessibility/Best Practices/SEO (se viável localmente).

## EVIDENCE
- Screenshots reais desktop (1440) e mobile (390) de todas as rotas públicas, antes/depois.
- DOM/computed-style audit (fonts, cores, overflow, contraste) via Edge headless.
- od lint nas páginas renderizadas.
- Build, lint, typecheck, console sem erros.
- Revisão adversarial independente e regressão das rotas alteradas.

## FAILURE CONDITIONS
- Mudança apenas cosmética (mesma composição/hierarquia da baseline editorial).
- CTA sem rastreio, preço/prazo ambíguos, conteúdo crítico invisível sem JS.
- Quebra do CRM interno (app/*) ou das rotas auth.
- Contraste inaceitável ou foco invisível.
