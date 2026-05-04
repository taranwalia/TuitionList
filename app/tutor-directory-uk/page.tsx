import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("/tutor-directory-uk")!;

export const metadata = metadataForSeoPage(page);

export default function TutorDirectoryUkPage() {
  return <SeoLandingPage page={page} />;
}
