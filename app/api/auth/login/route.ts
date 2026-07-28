import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";

    let email: string;
    let password: string;

    if (ct.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      email = params.get("email") || "";
      password = params.get("password") || "";
    } else {
      const json = await req.json();
      email = json.email || "";
      password = json.password || "";
    }

    if (!email || !password) {
      return NextResponse.redirect(
        new URL("/login?error=Email+dan+password+wajib+diisi", req.url),
        { status: 303 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.redirect(
        new URL(
          `/login?error=${error.message === "Invalid login credentials" ? "Email+atau+password+salah" : error.message}`,
          req.url,
        ),
        { status: 303 },
      );
    }

    if (!data.session) {
      return NextResponse.redirect(
        new URL("/login?error=Gagal+mendapatkan+sesi", req.url),
        { status: 303 },
      );
    }

    const { access_token, refresh_token, expires_at } = data.session;

    const cookieStore = await cookies();

    const sessionData = JSON.stringify({
      access_token,
      refresh_token,
      expires_at,
    });

    cookieStore.set("sb", sessionData, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.redirect(new URL("/dashboard", req.url), { status: 303 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan server";
    const url = new URL("/login", req.url);
    url.searchParams.set("error", msg);
    return NextResponse.redirect(url, { status: 303 });
  }
}
