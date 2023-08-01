import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";

export async function GET() {
	const about = (await db.query("SELECT * FROM about;")).rows[0];

	return NextResponse.json(about);
}

export async function PUT(req: NextRequest) {
	const { text } = await req.json();

	try {
		await db.query("UPDATE about SET text = $1 where id = 1;", [text]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
}