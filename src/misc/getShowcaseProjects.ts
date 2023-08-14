import db from "@/model/db.js";

export async function GetShowcaseProjects() {
	const projectIds = (await db.query(`SELECT * FROM showcase;`)).rows.map((obj: {project_id: string}) => obj.project_id);

	let projects = [];

	for (let id of projectIds) {
		const project = (await db.query(`SELECT * FROM projects where id = $1;`, [id])).rows[0];
		projects.push(project);
	}

	return projects;
}