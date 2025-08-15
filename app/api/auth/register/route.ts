import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/user.action";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};
    const { user, token } = await registerUser({ name, email, password });

    const res = NextResponse.json({ user }, { status: 201 });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error: any) {
    const message = error?.message || "Registration failed";
    const status = message.includes("Email already in use") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
