import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  const res = NextResponse.redirect(new URL("/", _req.url));
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return res;
}
