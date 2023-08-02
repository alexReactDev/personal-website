import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
	const { password } = await req.json();

	if(password !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json("Wrong password", {
			status: 403
		})
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

	const token = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }) .setExpirationTime("24h").sign(secret);

	const res = NextResponse.json("OK");

	res.cookies.set("jwt", token, {
		httpOnly: true,
		maxAge: 86400 //24h
	});

	return res;
}