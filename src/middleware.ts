import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const path = req.nextUrl.pathname;

    // Define public routes that don't need authentication
    const publicRoutes = ["/", "/NEWLOGO1.png", "/Register"];

    // Allow access to public routes without authentication
    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }
    // console.log("token", token);



    // If token is missing, redirect to login page
    if (!token) {
        console.log('No token → Redirecting to login');
        return NextResponse.redirect(new URL('/', req.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/|api/auth/|favicon.ico).*)',],
};


