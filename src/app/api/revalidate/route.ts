import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
	const path = req.nextUrl.searchParams.get("path");

	if(!path) return NextResponse.json("Bad request", { status: 400 });

	console.log(path);

	if(path) revalidatePath(path);

	return NextResponse.json("OK");
}