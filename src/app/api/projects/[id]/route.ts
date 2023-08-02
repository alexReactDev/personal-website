import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";
import fs from "fs/promises";
import path from "path";
import ApiMiddleware from "@/middleware/apiMiddleware";

const rootFolder = __dirname.match(/.+?personal-website/)![0];


export async function GET(req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	let project;

	try {
		project = (await db.query("SELECT * FROM projects where id = $1;", [id])).rows[0]
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		project.skills = (await db.query("SELECT * FROM projects_skills where project_id = $1;", [project.id])).rows.map((skillObj: { skill: string }) => skillObj.skill);

	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json(project);
}

export const DELETE = ApiMiddleware(async function (req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	const showcase = (await db.query("SELECT * FROM showcase;")).rows.map((obj: { project_id: string}) => obj.project_id);
	
	if(showcase.includes(+id)) {
		return NextResponse.json("Can't delete projects that is still on showcase. Please, remove it from showcase first", {
			status: 400
		})
	}

	try {
		await db.query("DELETE FROM projects where id = $1;", [id]);
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await fs.rm(path.join(rootFolder, "public", "images", "projects", id), { recursive: true });
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})

export const PUT = ApiMiddleware(async function (req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	const { skills, ...project } = await req.json();

	try {
		await db.query("UPDATE projects SET name = $1, title = $2, description = $3, date = $4, link = $5 where id = $6;", 
		[project.name, project.title, project.description, project.date, project.link, id]);
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await db.query("DELETE FROM projects_skills where project_id = $1;", [id]);

		for(let skill of skills) {
			await db.query("INSERT INTO projects_skills (project_id, skill) values ($1, $2);", [id, skill]);
		}
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})