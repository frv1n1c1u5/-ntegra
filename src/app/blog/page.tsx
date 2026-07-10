import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  FileWarning,
  MessageCircle,
  Search,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Escudo do Investidor | Íntegra Consultoria",
  description:
    "Blog da Íntegra Consultoria com artigos sobre COE, FGC, conflito de interesse, rebate e produtos financeiros complexos."
};

const featuredArticle = {
  category: "COE",
  title: "O que a corretora não te conta antes de vender um COE",
  excerpt:
    "Barreiras, indexadores, liquidez e custo de oportunidade costumam ficar escondidos atrás de uma promessa simples. Veja onde olhar antes de assinar.",
  readTime: "7 min",
  date: "Guia prático"
};

const articles = [
  {
    icon: FileWarning,
    category: "Produtos estruturados",
    title: "Como identificar risco escondido em uma operação estruturada",
    excerpt:
      "Um checklist objetivo para separar risco real, cenário otimista e linguagem comercial na lâmina do produto.",
    readTime: "6 min"
  },
  {
    icon: ShieldCheck,
    category: "FGC",
    title: "FGC: o que preparar antes da ansiedade bater",
    excerpt:
      "Documentos, limites por CPF/CNPJ e conglomerado, aplicativo e pontos que costumam gerar retrabalho.",
    readTime: "5 min"
  },
  {
    icon: TrendingUp,
    category: "Conflito de interesse",
    title: "Rebate não é detalhe: é incentivo econômico",
    excerpt:
      "Por que a comissão embutida pode mudar a qualidade da recomendação que chega ao investidor.",
    readTime: "4 min"
  },
  {
    icon: Search,
    category: "Segunda opinião",
    title: "Cinco perguntas antes de aceitar uma proposta do banco",
    excerpt:
      "Perguntas simples que obrigam a instituição a explicar liquidez, custo, prazo, risco e alternativa de forma mais clara.",
    readTime: "5 min"
  },
  {
    icon: BookOpen,
    category: "Educação financeira",
    title: "Quando o produto parece sofisticado, mas só é opaco",
    excerpt:
      "Sofisticação real melhora a relação risco-retorno. Opacidade só dificulta a comparação e protege quem vende.",
    readTime: "3 min"
  },
  {
    icon: FileWarning,
    category: "Mercado secundário",
    title: "Sair antes do vencimento: ágio, deságio e custo emocional",
    excerpt:
      "Como pensar em venda secundária sem confundir preço de saída com prejuízo inevitável ou solução automática.",
    readTime: "6 min"
  }
];

const categories = ["COE", "FGC", "Conflito de interesse", "Rebate", "Mercado secundário", "Checklist"];

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
              Conteúdo direto para quem quer entender o que está comprando, questionar incentivos comerciais e
              tomar decisões com mais clareza antes que o problema fique caro.
            </p>
          </div>

          <article className="blog-featured-card">
            <span className="article-category">{featuredArticle.category}</span>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.excerpt}</p>
            <div className="article-meta">
              <span>{featuredArticle.date}</span>
              <span>
                <Clock3 size={15} aria-hidden="true" />
                {featuredArticle.readTime}
              </span>
            </div>
            <a href="#artigos">
              Ler destaque
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="section blog-filter-band">
        <div className="shell blog-filter-grid">
          <div>
            <p className="section-kicker">Temas</p>
            <h2 className="section-title">Armadilhas explicadas em linguagem de investidor.</h2>
          </div>
          <div className="category-cloud" aria-label="Categorias do blog">
            {categories.map((category) => (
              <a href="#artigos" key={category}>{category}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="artigos">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="section-kicker">Artigos mockup</p>
              <h2 className="section-title">Últimas defesas publicadas.</h2>
            </div>
            <p className="section-copy">
              Estes cards são conteúdo de exemplo para validar o visual. Depois podem virar posts reais com SEO e páginas individuais.
            </p>
          </div>

          <div className="blog-grid">
            {articles.map((article) => {
              const Icon = article.icon;
              return (
                <article className="blog-card" key={article.title}>
                  <div className="blog-card-top">
                    <span className="card-icon">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <span className="article-category">{article.category}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-meta">
                    <span>
                      <Clock3 size={15} aria-hidden="true" />
                      {article.readTime}
                    </span>
                    <a href="#artigos" aria-label={`Ler ${article.title}`}>
                      Ler
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
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




