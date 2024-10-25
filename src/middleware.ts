import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token || !token.sub) {
    if (pathname === "/auth/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const userId = token.sub;

  if (pathname === "/dashboard") {
    return NextResponse.next();
  }

  const apiUrl = new URL(
    `/api/validate-password-updated/${userId}`,
    req.url,
  ).toString();

  const response = await fetch(apiUrl);

  const data = await response.json();

  const passwordUpdated = data.data.passwordUpdated;

  if (passwordUpdated === false) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
