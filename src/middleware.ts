import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/signup": true,
};

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[req.nextUrl.pathname];
  if (!session.isLoggedIn) {
    if (!exists) {
      return NextResponse.redirect(new URL("/signup", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
