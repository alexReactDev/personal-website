import ApiMiddleware from "@/middleware/apiMiddleware";
import db from "@/model/db.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const skills = (await db.query("SELECT * FROM skills;")).rows.map((skillObj: { name: string }) => skillObj.name);

	return NextResponse.json(skills);
}

export const POST = ApiMiddleware(async function (req: NextRequest) {
	const skill = await req.json();

	console.log(skill);

	try {
		await db.query("INSERT INTO skills (name) values ($1);", [skill.name]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	if(skill.projects?.length !== 0) {
		for (let project of skill.projects) {
			try {
				await db.query("INSERT INTO projects_skills (project_id, skill) values ($1, $2);", [project, skill.name]);
			} catch (e: any) {
				return NextResponse.json(e, {
					status: 500
				})
			}	
		}
	}

	if(skill.scopes?.length !== 0) {
		let scopes; 

		try {
			scopes = (await db.query("SELECT * FROM scopes;")).rows.map((scopeObj: { name: string }) => scopeObj.name);
		} catch (e: any) {
			return NextResponse.json(e, {
				status: 500
			})
		}	

		for (let scope of skill.scopes) {
			if(!scopes.includes(scope)) {
				try {
					await db.query("INSERT INTO scopes (name) values ($1);", [scope]);
				} catch (e: any) {
					return NextResponse.json(e, {
						status: 500
					})
				}	
			}

			try {
				await db.query("INSERT INTO skills_scopes (scope, skill) values ($1, $2);", [scope, skill.name]);
			} catch (e: any) {
				return NextResponse.json(e, {
					status: 500
				})
			}	
		}
	}

	return NextResponse.json("OK");
})