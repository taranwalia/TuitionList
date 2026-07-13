import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: "TuitionList | Free UK Tutor Directory",
    template: "%s | TuitionList"
  },
  description:
    "Find tutors across the UK for free. TuitionList helps parents, carers, and students discover independent tutors and tuition providers with no commission or parent finder fees.",
  metadataBase: new URL(SITE_URL),
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
      <head>
        <meta name="google-adsense-account" content="ca-pub-5873221361215755" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5873221361215755"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
