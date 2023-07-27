import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	console.log((await req.json()).password);

	return NextResponse.json("OK");
}