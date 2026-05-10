import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

export async function generateMetadata({ params }: { params: Promise<{ seoSlug: string[] }> }) {
  const { seoSlug } = await params;
  const page = getSeoPage(`/${seoSlug.join("/")}`);
  if (!page) return {};
  return metadataForSeoPage(page);
}

export default async function SeoCatchAllPage({ params }: { params: Promise<{ seoSlug: string[] }> }) {
  const { seoSlug } = await params;
  const page = getSeoPage(`/${seoSlug.join("/")}`);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
