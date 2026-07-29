import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  FileWarning,
  MessageCircle,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Escudo do Investidor | Íntegra Consultoria",
  description:
    "Artigos da Íntegra Consultoria sobre COE, FGC, conflito de interesse, rebate e produtos financeiros complexos."
};

const icons = [FileWarning, TrendingUp, ShieldCheck];
const featuredArticle = articles[0];
const whatsappHref =
  "https://wa.me/5551999381379?text=Ol%C3%A1%2C%20%C3%8Dntegra.%20Li%20o%20Escudo%20do%20Investidor%20e%20quero%20avaliar%20meu%20caso.";

export default function BlogPage() {
  return (
    <main className="page blog-page">
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
            <Link href="/#dores">Dores</Link>
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

      <section className="blog-hero">
        <div className="blog-hero-mark" aria-hidden="true">Í</div>
        <div className="shell blog-hero-grid">
          <div>
            <Link className="blog-back" href="/">
              <ArrowLeft size={17} aria-hidden="true" />
              Voltar para a Íntegra
            </Link>
            <p className="section-kicker">Blog</p>
            <h1>Escudo do Investidor</h1>
            <p className="blog-hero-copy">
              Conteúdo direto para entender o que você está comprando, questionar incentivos comerciais e
              decidir com mais clareza antes que o problema fique caro.
            </p>
          </div>

          <article className="blog-featured-card">
            <div className="blog-featured-image">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) calc(100vw - 32px), 460px"
              />
            </div>
            <span className="article-category">{featuredArticle.category}</span>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.description}</p>
            <div className="article-meta">
              <span>Guia prático</span>
              <span>
                <Clock3 size={15} aria-hidden="true" />
                {featuredArticle.readTime}
              </span>
            </div>
            <Link href={`/blog/${featuredArticle.slug}`}>
              Ler destaque
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="section blog-filter-band">
        <div className="shell blog-filter-grid">
          <div>
            <p className="section-kicker">Temas</p>
            <h2 className="section-title">Decisões financeiras explicadas sem linguagem de venda.</h2>
          </div>
          <div className="category-cloud" aria-label="Categorias do blog">
            {articles.map((article) => (
              <a href={`#${article.slug}`} key={article.category}>{article.category}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="artigos">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">Leitura essencial</p>
              <h2 className="section-title">Três guias para começar mais protegido.</h2>
            </div>
            <p className="section-copy">
              Conteúdo educacional fundamentado em fontes oficiais, com checklists que você pode usar antes de investir ou ao revisar uma decisão.
            </p>
          </div>

          <div className="blog-grid">
            {articles.map((article, index) => {
              const Icon = icons[index];
              return (
                <article className="blog-card" id={article.slug} key={article.slug}>
                  <Link className="blog-card-image" href={`/blog/${article.slug}`} aria-label={`Ler ${article.title}`}>
                    <Image src={article.image} alt="" fill sizes="(max-width: 767px) calc(100vw - 32px), 380px" />
                  </Link>
                  <div className="blog-card-body">
                    <div className="blog-card-top">
                      <span className="card-icon">
                        <Icon size={21} aria-hidden="true" />
                      </span>
                      <span className="article-category">{article.category}</span>
                    </div>
                    <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
                    <p>{article.description}</p>
                    <div className="article-meta">
                      <span>
                        <Clock3 size={15} aria-hidden="true" />
                        {article.readTime}
                      </span>
                      <Link href={`/blog/${article.slug}`} aria-label={`Ler ${article.title}`}>
                        Ler artigo
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section blog-cta-band">
        <div className="shell blog-cta">
          <div>
            <p className="section-kicker">Do artigo para o caso real</p>
            <h2>Leu algo parecido com o que aconteceu com você?</h2>
            <p>
              A análise inicial custa R$ 129,00 e serve para entender se há risco, conflito ou documentação que precisa ser revisada.
            </p>
          </div>
          <Link className="button button-accent" href="/#triagem">
            Preencher triagem
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-grid">
          <div>
            <strong>Escudo do Investidor</strong>
            Um blog da Íntegra Consultoria.
          </div>
          <div>
            Conteúdo educacional. Não constitui recomendação personalizada de investimento, análise de valores mobiliários ou substituição de parecer jurídico/regulatório.
          </div>
        </div>
      </footer>
    </main>
  );
}
