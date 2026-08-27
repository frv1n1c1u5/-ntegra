# Gauntlet state

- Mode: extreme (up to 8 global cycles, up to 5 per component)
- Iteration: 2 — adversarial remediation and final local verification
- Baseline: current production landing is a single hero plus footer; menu routes to support pages.
- Primary conversion: qualified WhatsApp.
- Offer: Dossiê Expresso, R$ 229, delivery within 48h.
- Evidence: production build, TypeScript check and ESLint pass; desktop and 390px mobile browser inspection; mobile menu and `/precos` route confirmed; no browser console errors; OG image returns `image/png` and homepage emits canonical/OG metadata.
- Adversarial review: initial review found broken CTA, incomplete WhatsApp qualification, UTM loss between routes, form-label accessibility gaps, motion gaps, duplicate canonical risk and price inconsistency. All were remediated and a second independent review found no P0/P1 remaining.
- Pending external evidence: a Vercel preview and Lighthouse audit. Local Lighthouse was attempted but the global npm cache reported `ECOMPROMISED`; no cache mutation was forced.
