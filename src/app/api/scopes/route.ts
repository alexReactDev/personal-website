import ApiMiddleware from "@/middleware/apiMiddleware";
import db from "@/model/db.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const scopes = (await db.query("SELECT * FROM scopes;")).rows.map((scopeObj: { name: string}) => scopeObj.name);

	return NextResponse.json(scopes);
}

export const POST = ApiMiddleware(async (req: NextRequest) => {
	const { data } = await req.json();

	try {
		await db.query("INSERT INTO scopes (name) values ($1);", [data]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})