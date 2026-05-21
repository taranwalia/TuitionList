"use client";

import { LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { signOut } from "@/app/actions/auth";
import { Button, LinkButton } from "@/components/ui";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthNavState = {
  loading: boolean;
  dashboardHref: "/admin" | "/tutor-dashboard";
  signedIn: boolean;
};

export function AuthNav() {
  const [state, setState] = useState<AuthNavState>({
    loading: true,
    dashboardHref: "/tutor-dashboard",
    signedIn: false
  });

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const supabase = createSupabaseBrowserClient();
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!active) return;
        if (!user) {
          setState({ loading: false, dashboardHref: "/tutor-dashboard", signedIn: false });
          return;
        }

        const { data } = await supabase.from("profiles").select("role").eq("auth_user_id", user.id).maybeSingle();
        if (!active) return;
        setState({
          loading: false,
          dashboardHref: data?.role === "admin" ? "/admin" : "/tutor-dashboard",
          signedIn: true
        });
      } catch {
        if (active) setState({ loading: false, dashboardHref: "/tutor-dashboard", signedIn: false });
      }
    }

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  if (state.loading || !state.signedIn) {
    return (
      <>
        <LinkButton href="/login" variant="secondary" className="gap-2">
          <LogIn className="size-4" aria-hidden />
          Login
        </LinkButton>
        <LinkButton href="/signup">Join free</LinkButton>
      </>
    );
  }

  return (
    <>
      <LinkButton href={state.dashboardHref} variant="secondary" className="hidden sm:inline-flex">
        Dashboard
      </LinkButton>
      <form action={signOut}>
        <Button type="submit" variant="ghost" className="gap-2">
          <LogOut className="size-4" aria-hidden />
          Logout
        </Button>
      </form>
    </>
  );
}
