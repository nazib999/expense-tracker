"use server";
import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  const { name, email, password } = input;
  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already in use");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = signJwt({ sub: String(user._id), email: user.email, name: user.name });
  const safeUser = { _id: String(user._id), name: user.name, email: user.email };
  return { user: safeUser, token };
}

export async function loginUser(input: LoginInput) {
  const { email, password } = input;
  if (!email || !password) {
    throw new Error("Missing credentials");
  }
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = signJwt({ sub: String(user._id), email: user.email, name: user.name });
  const safeUser = { _id: String(user._id), name: user.name, email: user.email };
  return { user: safeUser, token };
}
