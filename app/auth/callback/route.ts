import { NextResponse } from "next/server";
import { syncAppUserFromAuth } from "@/lib/data/users";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Supabase%20environment%20variables%20are%20not%20configured.",
        requestUrl.origin,
      ),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=Missing%20OAuth%20code.", requestUrl.origin),
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(error.message)}`,
        requestUrl.origin,
      ),
    );
  }

  if (data.user) {
    try {
      await syncAppUserFromAuth(data.user);
    } catch (syncError) {
      console.error("Failed to sync app user after auth callback", syncError);
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
