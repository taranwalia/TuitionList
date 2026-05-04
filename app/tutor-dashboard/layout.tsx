import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function TutorDashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
