import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

// Define which routes should only be accessible by authenticated users
const protectedRoutes = ["/profile"]

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    // Try to get the user's session cookie (null/undefined if not logged in)
    const sessionCookie = getSessionCookie(req);
  
    // Default response: allow the request to continue
    const res = NextResponse.next();

    // Flags for current request state
    const isLoggedIn = !!sessionCookie; // true if session cookie exists
    const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname); // true if current path is in protectedRoutes
    const isOnAuthRoute = nextUrl.pathname.startsWith("/auth"); // true if user is on an auth page (login, signup, etc.)
  
    // 🚫 If user is trying to access a protected route but has no session -> redirect to login
    if (isOnProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // 🔄 If user is already logged in but tries to go to an auth route -> redirect to profile
    if (isOnAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    // ✅ Otherwise, let the request pass through as normal
    return res;
}
  
// Middleware configuration: run for all routes except API, static files, and system assets
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
    ]
}
