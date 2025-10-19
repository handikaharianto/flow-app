import { NextResponse, NextRequest } from "next/server";
import { getUser } from "@/lib/actions/user.actions";

export async function middleware(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    req.cookies.delete("session");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
