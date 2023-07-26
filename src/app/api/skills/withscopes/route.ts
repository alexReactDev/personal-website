import db from "@/model/db.js";
import { NextResponse } from "next/server";

export async function GET() {
	const skills = (await db.query("SELECT * FROM skills;")).rows;

	for (let skill of skills) {
		const scopes = (await db.query("SELECT * FROM skills_scopes where skill = $1;", [skill.name])).rows.map((scopeObj: { scope: string}) => scopeObj.scope);

		skill.scopes = [...scopes];
	}

	return NextResponse.json(skills);
}