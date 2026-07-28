import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            // Don't set cookies here; we'll set them on the redirect response
          },
        },
      },
    );

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.json({
        error: error.message === "Invalid login credentials" ? "Email atau password salah" : error.message,
      }, { status: 401 });
    }

    if (!data.session) {
      return NextResponse.json({ error: "Gagal mendapatkan sesi" }, { status: 500 });
    }

    const response = NextResponse.redirect(new URL("/dashboard", req.url), { status: 303 });

    const { access_token, refresh_token, expires_at } = data.session;
    const isSecure = process.env.NODE_ENV === "production";

    response.cookies.set("sb-uukotaigrofcoiyymktg-auth-token", JSON.stringify({
      access_token,
      refresh_token,
      expires_at,
    }), {
      httpOnly: false,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Terjadi kesalahan server",
    }, { status: 500 });
  }
}
