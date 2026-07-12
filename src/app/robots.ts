import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: ["/", "/blog", "/privacidade"], disallow: ["/app/", "/entrar", "/auth/", "/definir-senha", "/api/"] }, sitemap: "https://integraconsultoria.com.br/sitemap.xml" };
}
