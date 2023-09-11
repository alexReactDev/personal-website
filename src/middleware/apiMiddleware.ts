import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export default function ApiMiddleware(routeFunction: (...args: any) => any) {
	return  async (req: NextRequest, ...args: any) => {
		if(process.env.DEV = "true") return await routeFunction(req, ...args);
		
		const token = req.cookies.get("jwt");

		if(!token) {
			return NextResponse.json("Access denied", {
				status: 401
			})
		}
	
		const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

		try {
			await jwtVerify(token.value, secret);
		} catch (e: any) {
			return NextResponse.json(e, {
				status: 403
			})
		}
	
		const res = await routeFunction(req, ...args);

		const newToken = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").sign(secret);

		res.cookies.set("jwt", newToken, {
			httpOnly: true,
			maxAge: 86400 //24h
		});
	
		return res;
	}
}