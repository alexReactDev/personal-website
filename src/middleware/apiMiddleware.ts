import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default function ApiMiddleware(routeFunction: (...args: any) => any) {
	return (req: NextRequest, ...args: any) => {
		const token = req.cookies.get("jwt");

		if(!token) {
			return NextResponse.json("Access denied", {
				status: 401
			})
		}
	
		const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
	
		const isValid = jwtVerify(token.value, secret);
	
		if(!isValid) {
			return NextResponse.json("Access denied", {
				status: 401
			})
		}
	
		return routeFunction(req, ...args);
	}
}