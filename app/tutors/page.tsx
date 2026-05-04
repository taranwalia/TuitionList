import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("/tutors")!;

export const metadata = metadataForSeoPage(page);

export default function TutorsPage() {
  return <SeoLandingPage page={page} />;
}
