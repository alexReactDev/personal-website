import db from "@/model/db.js";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import ApiMiddleware from "@/middleware/apiMiddleware";
import { revalidatePath } from "next/cache";

const rootFolder = __dirname.match(/.+?personal-website/)![0];

export async function GET() {
	const projects = (await db.query("SELECT * FROM projects;")).rows;

	for (let project of projects) {
		const projectSkills = (await db.query("SELECT * FROM projects_skills where project_id = $1;", [project.id])).rows.map((skillObj: { skill: string }) => skillObj.skill);

		project.skills = projectSkills;
	}

	return NextResponse.json(projects);
}

export const POST = ApiMiddleware(async function (req: NextRequest) { 
	const { skills, ...project } = await req.json();

	let id;

	try {
		id = (await db.query("INSERT INTO projects (name, title, description, date, link) values ($1, $2, $3, $4, $5) RETURNING id;", 
		[project.name, project.title, project.description, project.date, project.link])).rows[0].id;
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		for(let skill of skills) {
			await db.query("INSERT INTO projects_skills (project_id, skill) values ($1, $2);", [+id, skill]);
		}
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await fs.mkdir(path.join(rootFolder, "public", "images", "projects", id + ""));
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		revalidatePath("/(Admin)/admin/projects");
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json(id);
})