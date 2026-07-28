import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    const cookieStore = await cookies();
    const response = NextResponse.redirect(new URL("/dashboard", req.url), { status: 303 });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

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

    return response;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan server";
    const url = new URL("/login", req.url);
    url.searchParams.set("error", msg);
    return NextResponse.redirect(url, { status: 303 });
  }
}
