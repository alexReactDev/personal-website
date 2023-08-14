import { NextRequest, NextResponse } from "next/server";

import db from "@/model/db.js";
import ApiMiddleware from "@/middleware/apiMiddleware";
import { revalidatePath } from "next/cache";

export async function GET() {
	const projectIds = (await db.query(`SELECT * FROM showcase;`)).rows.map((obj: {project_id: string}) => obj.project_id);

	let projects = [];

	for (let id of projectIds) {
		const project = (await db.query(`SELECT * FROM projects where id = $1;`, [id])).rows[0];
		projects.push(project);
	}

	return NextResponse.json(projects);
}

export const POST = ApiMiddleware(async function POST(req: NextRequest) {
	const { project_id } = await req.json();

	try {
		await db.query("INSERT INTO showcase (project_id) values ($1);", [project_id]);
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