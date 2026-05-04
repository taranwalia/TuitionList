import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/admin/*",
          "/admin/dashboard",
          "/tutor-dashboard",
          "/tutor-dashboard/",
          "/tutor-dashboard/*",
          "/tutor/dashboard",
          "/tutor/enquiries",
          "/tutor/settings",
          "/account",
          "/account/*",
          "/settings",
          "/settings/*",
          "/login",
          "/signup",
          "/enquiry-submitted",
          "/*?*error=",
          "/*?*demo="
        ]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
