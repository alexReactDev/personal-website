import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import ApiMiddleware from "@/middleware/apiMiddleware";

export const POST = ApiMiddleware(function(req: NextRequest) {
	const path = req.nextUrl.searchParams.get("path");

	if(!path) return NextResponse.json("Bad request", { status: 400 });

	if(path) revalidatePath(path);

	return NextResponse.json("OK");
})