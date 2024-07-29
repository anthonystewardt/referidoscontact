// src/middleware.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get("myTokenName");

  console.log('middleware', jwt, pathname)

  

  if (pathname.startsWith('/admin')) {
    if (!jwt) {
      return NextResponse.redirect(new URL("/auth/admin/login", request.url));
    }
    try {
      await jwtVerify(jwt.value, new TextEncoder().encode("secret"));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/admin/login", request.url));
    }
  }

  // Delega el manejo a next-auth middleware para las rutas del dashboard
  if (pathname.startsWith('/dashboard')) {
    const nextAuthMiddleware = (await import('./middleware-nextauth')).default;
    return nextAuthMiddleware(request as any, {} as any);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
