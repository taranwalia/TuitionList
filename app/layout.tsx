import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: {
    default: "TuitionList | Free UK Tutor Directory",
    template: "%s | TuitionList"
  },
  description:
    "Find tutors across the UK for free. TuitionList helps parents, carers, and students discover independent tutors and tuition providers with no commission or parent finder fees at launch.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "TuitionList | Free UK Tutor Directory",
    description:
      "Search independent tutors and tuition providers across the UK by subject, level, location, online availability, and hourly rate.",
    type: "website",
    images: ["/brand/tuitionlist-logo.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
