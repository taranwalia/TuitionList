import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("/free-tutor-directory-uk")!;

export const metadata = metadataForSeoPage(page);

export default function FreeTutorDirectoryUkPage() {
  return <SeoLandingPage page={page} />;
}
