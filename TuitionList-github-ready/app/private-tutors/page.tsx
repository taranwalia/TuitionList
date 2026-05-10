import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("/private-tutors")!;

export const metadata = metadataForSeoPage(page);

export default function PrivateTutorsPage() {
  return <SeoLandingPage page={page} />;
}
