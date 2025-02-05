import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, createSecretKey } from "jose";

const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
  throw new Error("JWT Secret Key is missing");
}

// Convert secret key to a Uint8Array
const secretKeyUint8Array = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    // Explicitly verify using HS256
    await jwtVerify(token, secretKeyUint8Array, {
      algorithms: ["HS256"],
    });

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// Protect these routes
export const config = {
  matcher: ["/", "/pages/:path*"],
};
