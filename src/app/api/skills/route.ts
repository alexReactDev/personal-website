import db from "@/model/db.js";
import { NextResponse } from "next/server";

export async function GET() {
	const skills = (await db.query("SELECT * FROM skills;")).rows.map((skillObj: { name: string }) => skillObj.name);

	return NextResponse.json(skills);
}