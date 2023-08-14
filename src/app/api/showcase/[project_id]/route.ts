import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";
import ApiMiddleware from "@/middleware/apiMiddleware";
import { revalidatePath } from "next/cache";

export const DELETE = ApiMiddleware(async function DELETE(req: NextRequest, { params: { project_id } }: { params: { project_id: string }}) {
	try {
		await db.query("DELETE FROM showcase where project_id = $1;", [project_id]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		revalidatePath("/");
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})