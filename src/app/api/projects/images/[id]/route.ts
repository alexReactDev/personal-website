import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";
import fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";

const rootFolder = __dirname.match(/.+?personal-website/)![0];

export async function GET(req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	let images;

	try {
		images = (await db.query("SELECT * FROM projects_images where project_id = $1;", [id])).rows.map((imageObj: { img : string }) => imageObj.img);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json(images);
}

export async function POST(req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	const { data } = await req.json();

	for(let imgData of data) {
		try {
			const extname = imgData.name.match(/\..+$/);
			const file = Buffer.from(imgData.data, "binary");
			const hash = v4();

			await fs.writeFile(path.join(rootFolder, "public", "images", "projects", id, hash + extname), file);

			await db.query("INSERT INTO projects_images (project_id, img) values ($1, $2);", [id, `/images/projects/${id}/${hash + extname}`]);
		} catch (e: any) {
			console.log(e);
			return NextResponse.json(e, {
				status: 500
			})
		}
	}

	return NextResponse.json("OK");
}