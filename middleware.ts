import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const publicRoutes = ["/", "/blog", "/kontak", "/kebijakan-privasi", "/syarat-ketentuan", "/api"];
const authRoutes = ["/login", "/register", "/forgot-password", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public routes and auth routes
  if (publicRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    return await updateSession(request);
  }

  if (authRoutes.some((r) => pathname.startsWith(r))) {
    return await updateSession(request);
  }

  // Everything else is protected
  const supabaseResponse = await updateSession(request);

  const supabase = await createMiddlewareClient(request, supabaseResponse);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// Helper to create middleware client with response
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

async function createMiddlewareClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );
}
