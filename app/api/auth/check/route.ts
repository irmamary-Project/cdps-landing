import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  const authCookie = allCookies.find(c => c.name.includes("auth-token"));
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    },
  );

  const { data, error } = await supabase.auth.getUser();

  return NextResponse.json({
    hasAuthCookie: !!authCookie,
    authCookieName: authCookie?.name || null,
    authCookieLength: authCookie?.value.length || 0,
    authCookiePrefix: authCookie?.value.substring(0, 10) || null,
    user: data?.user?.email || null,
    error: error?.message || null,
    allCookieNames: allCookies.map(c => c.name),
  });
}
