type PageIntroProps = { eyebrow: string; title: string; copy: string };

export default function PageIntro({ eyebrow, title, copy }: PageIntroProps) {
  return <header className="editorial-page-intro"><div className="shell"><p className="editorial-kicker">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div></header>;
}
