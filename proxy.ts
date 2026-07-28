import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/", "/blog", "/kontak", "/kebijakan-privasi", "/syarat-ketentuan", "/api"];
const authRoutes = ["/login", "/register", "/forgot-password", "/auth/callback"];

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    if (publicRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
      return NextResponse.next();
    }

    if (authRoutes.some((r) => pathname.startsWith(r))) {
      return NextResponse.next();
    }

    const allCookies = request.cookies.getAll();
    const authCookie = allCookies.find((c) => c.name.includes("auth-token"));

    if (!authCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (e) {
    console.error("middleware error", e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)",
  ],
};
