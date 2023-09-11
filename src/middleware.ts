import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
	if(process.env.DEV === "true") return NextResponse.next();

	const token = req.cookies.get("jwt");

	if(!token) {
		const url = new URL("/login", process.env.BASE_URL!);
		url.searchParams.set("from", req.nextUrl.pathname);

		return NextResponse.redirect(url);
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

	try {
		await jwtVerify(token.value, secret);
	} catch (e: any) {
		const url = new URL("/login", process.env.BASE_URL!);
		url.searchParams.set("from", req.nextUrl.pathname);

		return NextResponse.redirect(url);
	}

	const res = NextResponse.next();

	const newToken = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").sign(secret);

	res.cookies.set("jwt", newToken, {
		httpOnly: true,
		maxAge: 86400 //24h
	});

	return res;
}

export const config = {
	matcher: '/admin/:path*',
}