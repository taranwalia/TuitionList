import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPage, metadataForSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("/locations")!;

export const metadata = metadataForSeoPage(page);

export default function LocationsPage() {
  return <SeoLandingPage page={page} />;
}
