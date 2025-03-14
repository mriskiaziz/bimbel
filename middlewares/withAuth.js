import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export default function withAuth(middleware, requireAuth = []) {
  const startsWithAnyPrefix = (link, array) => {
    for (let prefix of array) {
      if (link.startsWith(prefix)) {
        return true;
      }
    }
    return false;
  };

  return async (req, next) => {
    const pathname = req.nextUrl.pathname;

    if (pathname == "/login") {
      const token = await getToken({ req, secret });

      if (token) {
        let url = new URL(`/${token.role}`, req.url);
        return NextResponse.redirect(url);
      } else {
        const response = NextResponse.next();
        response.headers.set("Cache-Control", "no-store, max-age=0");
        return response;
      }
    }

    if (startsWithAnyPrefix(pathname, requireAuth)) {
      const token = await getToken({ req, secret });

      if (!token) {
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
      } else {
        if (!pathname.startsWith(`/${token.role}`)) {
          const url = new URL(`/${token.role}`, req.url);
          return NextResponse.redirect(url);
        }
      }
    }
    return middleware(req, next);
  };
}
