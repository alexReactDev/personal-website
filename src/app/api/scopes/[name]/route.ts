import db from "@/model/db.js";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params: { name } }: { params: { name: string } }) {
	try {
		await db.query("DELETE FROM scopes where name = $1;", [name]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
}