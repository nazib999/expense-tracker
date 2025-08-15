import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface JwtPayload {
  sub: string; // user id
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
}

// Minimal sign options to avoid depending on @types/jsonwebtoken
interface SignOptionsMinimal {
  expiresIn?: string | number;
  [key: string]: unknown;
}

export function signJwt(payload: Omit<JwtPayload, "iat" | "exp">, options?: SignOptionsMinimal) {
  return (jwt as any).sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...options });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return (jwt as any).verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
