import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/user.action";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body || {};
    const { user, token } = await loginUser({ email, password });

    const res = NextResponse.json({ user }, { status: 200 });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error: any) {
    const message = error?.message || "Login failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
