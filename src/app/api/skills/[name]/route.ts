import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";
import ApiMiddleware from "@/middleware/apiMiddleware";
import { revalidatePath } from "next/cache";

export const DELETE = ApiMiddleware(async function DELETE(req: NextRequest, { params: { name } }: { params: { name: string } }) {
	try {
		await db.query("DELETE FROM skills where name = $1;", [name]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		revalidatePath("/api/skills");
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})