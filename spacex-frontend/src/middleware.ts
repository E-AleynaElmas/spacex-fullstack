import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("token");
  const url = new URL(request.url);

  // Kullanıcı oturum açmış ve auth/login sayfasına gitmeye çalışıyorsa ana sayfaya yönlendirme işlemi
  if (isAuthenticated && url.pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Eğer kullanıcı oturum açmamışsa ve korunan sayfalardan birine erişmeye çalışıyorsa, login sayfasına yönlendirme işlemi
  if (!isAuthenticated && !url.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Diğer durumlar için normal akışa devam et
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/live",
    "/settings",
    "/calendar",
    "/auth/login", 
    "/", 
  ],
};