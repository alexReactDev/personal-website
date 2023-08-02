import ApiMiddleware from "@/middleware/apiMiddleware";
import db from "@/model/db.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const {id, ...contacts} = (await db.query("SELECT * FROM contacts;")).rows[0];

	return NextResponse.json(contacts);
}

export const PUT = ApiMiddleware(async function (req: NextRequest) {
	const contacts = await req.json();

	try {
		await db.query("UPDATE contacts SET phone = $1, email = $2, linkedin = $3, github = $4, skype = $5, messengers = $6;", [contacts.phone, contacts.email, contacts.linkedin, contacts.github, contacts.skype, contacts.messengers]);
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})