import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("jwt");

	if(!token) {
		const url = new URL("/login", process.env.BASE_URL!);
		url.searchParams.set("from", req.nextUrl.pathname);

		return NextResponse.redirect(url);
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

	const isValid = jwtVerify(token.value, secret);

	if(!isValid) {
		const url = new URL("/login", process.env.BASE_URL!);
		url.searchParams.set("from", req.nextUrl.pathname);

		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/admin/:path*',
}