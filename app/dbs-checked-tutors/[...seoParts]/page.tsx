import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getDbsCheckedTutorsSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

export async function generateMetadata({ params }: { params: Promise<{ seoParts: string[] }> }) {
  const { seoParts } = await params;
  const page = getDbsCheckedTutorsSeoPage(seoParts);
  if (!page) return {};
  return metadataForSeoPage(page);
}

export default async function DbsCheckedTutorsSeoPage({ params }: { params: Promise<{ seoParts: string[] }> }) {
  const { seoParts } = await params;
  const page = getDbsCheckedTutorsSeoPage(seoParts);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
