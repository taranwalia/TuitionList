import { notFound } from "next/navigation";
import { renderUrlSetXml, SITEMAP_SECTIONS, sitemapEntriesForSection, type SitemapSection } from "@/lib/sitemap";

export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const section = name.replace(/\.xml$/, "") as SitemapSection;

  if (!SITEMAP_SECTIONS.includes(section)) notFound();

  const entries = await sitemapEntriesForSection(section);
  return new Response(renderUrlSetXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
