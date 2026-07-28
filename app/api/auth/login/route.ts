import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.redirect(
        new URL("/login?error=Email+dan+password+wajib+diisi", req.url),
      );
    }

    const cookieStore = await cookies();
    const response = NextResponse.redirect(new URL("/dashboard", req.url));

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

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return NextResponse.redirect(
        new URL(
          `/login?error=${error.message === "Invalid login credentials" ? "Email+atau+password+salah" : error.message}`,
          req.url,
        ),
      );
    }

    return response;
  } catch (err) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${err instanceof Error ? err.message : "Terjadi+kesalahan+server"}`,
        req.url,
      ),
    );
  }
}
