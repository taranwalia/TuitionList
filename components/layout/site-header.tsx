import { Search } from "lucide-react";
import Link from "next/link";
import { AuthNav } from "@/components/layout/auth-nav";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LinkButton } from "@/components/ui";

const navItems = [
  ["Find a Tutor", "/find-a-tutor"],
  ["Online Tutors", "/online-tutors"],
  ["Subjects", "/subjects"],
  ["Guides", "/guides"],
  ["Become a Tutor", "/become-a-tutor"],
  ["How It Works", "/how-it-works"],
  ["Safeguarding", "/safeguarding"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="TuitionList home">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-1.5 py-1 hover:bg-sky-50 hover:text-navy-900">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/find-a-tutor" variant="secondary" className="hidden gap-2 sm:inline-flex">
            <Search className="size-4" aria-hidden />
            Search
          </LinkButton>
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
