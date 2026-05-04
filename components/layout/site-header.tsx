import { LogIn, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button, LinkButton } from "@/components/ui";
import { getCurrentUserSummary } from "@/lib/auth";

const navItems = [
  ["Find a Tutor", "/find-a-tutor"],
  ["Online Tutors", "/online-tutors"],
  ["Subjects", "/subjects"],
  ["Become a Tutor", "/become-a-tutor"],
  ["How It Works", "/how-it-works"],
  ["Safeguarding", "/safeguarding"]
];

export async function SiteHeader() {
  const user = await getCurrentUserSummary();
  const dashboardHref = user?.role === "admin" ? "/admin" : "/tutor-dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="TuitionList home">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-navy-800">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/find-a-tutor" variant="secondary" className="hidden gap-2 sm:inline-flex">
            <Search className="size-4" aria-hidden />
            Search
          </LinkButton>
          {user ? (
            <>
              <LinkButton href={dashboardHref} variant="secondary" className="hidden sm:inline-flex">
                Dashboard
              </LinkButton>
              <form action={signOut}>
                <Button type="submit" variant="ghost" className="gap-2">
                  <LogOut className="size-4" aria-hidden />
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <LinkButton href="/login" variant="secondary" className="gap-2">
                <LogIn className="size-4" aria-hidden />
                Login
              </LinkButton>
              <LinkButton href="/signup">Join free</LinkButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
