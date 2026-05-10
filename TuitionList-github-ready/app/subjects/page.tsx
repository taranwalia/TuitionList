import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("/subjects")!;

export const metadata = metadataForSeoPage(page);

export default function SubjectsPage() {
  return <SeoLandingPage page={page} />;
}
