import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("/online-tutors")!;

export const metadata = metadataForSeoPage(page);

export default function OnlineTutorsPage() {
  return <SeoLandingPage page={page} />;
}
