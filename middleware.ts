import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/", "/blog", "/kontak", "/kebijakan-privasi", "/syarat-ketentuan", "/api"];
const authRoutes = ["/login", "/register", "/forgot-password", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    return NextResponse.next({ request });
  }

  if (authRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.next({ request });
  }

  // Check if the auth cookie exists
  const allCookies = request.cookies.getAll();
  const authCookie = allCookies.find((c) => c.name.includes("auth-token"));

  if (!authCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)",
  ],
};
