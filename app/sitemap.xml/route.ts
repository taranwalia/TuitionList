import { renderSitemapIndexXml } from "@/lib/sitemap";

export async function GET() {
  return new Response(renderSitemapIndexXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
