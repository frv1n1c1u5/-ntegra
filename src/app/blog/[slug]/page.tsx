import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, ExternalLink, MessageCircle } from "lucide-react";
import { articles, getArticle } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Íntegra Consultoria`,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      images: [{ url: article.image, alt: article.imageAlt }]
    }
  };
}

const whatsappHref =
  "https://wa.me/5551999381379?text=Ol%C3%A1%2C%20%C3%8Dntegra.%20Li%20um%20artigo%20no%20Escudo%20do%20Investidor%20e%20quero%20avaliar%20meu%20caso.";

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleUrl = `https://integraconsultoria.com.br/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `https://integraconsultoria.com.br${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Organization", name: "Íntegra Consultoria" },
    publisher: { "@type": "Organization", name: "Íntegra Consultoria" },
    mainEntityOfPage: articleUrl
  };

  return (
    <main className="page article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav className="nav" aria-label="Navegação principal">
        <div className="shell nav-inner">
          <Link className="brand" href="/" aria-label="Íntegra Consultoria">
            <span className="brand-mark" aria-hidden="true">Í</span>
            <span className="brand-name">
              <strong>Íntegra</strong>
              <small>Consultoria</small>
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/#metodo">Método</Link>
            <Link href="/#precos">Preços</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <a className="button button-primary" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Falar agora
          </a>
        </div>
      </nav>

      <header className="article-hero">
        <div className="shell article-hero-shell">
          <Link className="article-back" href="/blog">
            <ArrowLeft size={17} aria-hidden="true" />
            Escudo do Investidor
          </Link>
          <span className="article-category">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-byline">
            <span>Por Íntegra Consultoria</span>
            <span><Clock3 size={15} aria-hidden="true" />{article.readTime} de leitura</span>
            <span>Revisado em {article.updatedAt}</span>
          </div>
        </div>
      </header>

      <div className="shell article-cover">
        <Image
          src={article.image}
          alt={article.imageAlt}
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 767px) calc(100vw - 32px), 1060px"
        />
      </div>

      <article className="shell article-layout">
        <div className="article-content">
          <div className="article-intro">
            {article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              )}
              {section.note && <aside className="article-note">{section.note}</aside>}
            </section>
          ))}

          <section className="article-sources">
            <p className="section-kicker">Fontes consultadas</p>
            <h2>Documentos oficiais</h2>
            <ol>
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    {source.label}<ExternalLink size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
            <p className="article-disclaimer">
              Conteúdo educacional e geral. Não constitui recomendação personalizada de investimento nem substitui análise jurídica, regulatória ou financeira do caso concreto.
            </p>
          </section>
        </div>

        <aside className="article-rail">
          <div>
            <span className="article-rail-label">Precisa revisar um caso real?</span>
            <h2>Transforme os documentos em uma decisão clara.</h2>
            <p>A triagem inicial ajuda a identificar risco, conflito e os próximos passos possíveis.</p>
            <Link className="button button-accent" href="/#triagem">
              Solicitar análise<ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </article>

      <section className="article-next">
        <div className="shell">
          <p className="section-kicker">Continue sua leitura</p>
          <div className="article-next-grid">
            {articles.filter(({ slug: candidate }) => candidate !== article.slug).map((next) => (
              <Link href={`/blog/${next.slug}`} key={next.slug}>
                <span>{next.category}</span>
                <strong>{next.title}</strong>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-grid">
          <div><strong>Escudo do Investidor</strong>Um blog da Íntegra Consultoria.</div>
          <div>Informação clara para questionar produtos, incentivos e decisões financeiras complexas.</div>
        </div>
      </footer>
    </main>
  );
}
