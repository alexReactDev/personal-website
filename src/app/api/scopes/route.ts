import db from "@/model/db.js";
import { NextResponse } from "next/server";

export async function GET() {
	const scopes = (await db.query("SELECT * FROM scopes;")).rows.map((scopeObj: { name: string}) => scopeObj.name);

	return NextResponse.json(scopes);
}