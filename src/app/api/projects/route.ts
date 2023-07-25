import db from "@/model/db.js";
import { NextResponse } from "next/server";

export async function GET() {
	const projects = (await db.query("SELECT * FROM projects;")).rows;

	for (let project of projects) {
		const projectSkills = (await db.query("SELECT * FROM projects_skills where project_id = $1;", [project.id])).rows.map((skillObj: { skill: string }) => skillObj.skill);

		project.skills = projectSkills;
	}

	return NextResponse.json(projects);
}