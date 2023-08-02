import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import ApiMiddleware from "@/middleware/apiMiddleware";
import db from "@/model/db.js";

const rootFolder = __dirname.match(/.+?personal-website/)![0];

export async function GET(req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	let projectPreview;

	try {
		projectPreview = (await db.query("SELECT preview FROM projects where id = $1;", [id])).rows[0].preview;
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json(projectPreview);
}

export const PUT = ApiMiddleware(async function (req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	const { data } = await req.json();
	const extname = data.name.match(/\..+$/);

	try {
		let preview = (await db.query("SELECT preview FROM projects where id = $1;", [id])).rows[0].preview;
		if(preview) await fs.rm(path.join(rootFolder, "public", preview));
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		const file = Buffer.from(data.data, "binary");
		await fs.writeFile(path.join(rootFolder, "public", "images", "projects", id, `preview${extname}`), file);
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await db.query("UPDATE projects SET preview = $1 where id = $2;", [`/images/projects/${id}/preview${extname}`, id]);
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
});

export const DELETE = ApiMiddleware(async (req: NextRequest, { params: { id }}:{ params: { id: string }}) => {
	let preview;

	try {
		preview = (await db.query("SELECT preview FROM projects where id = $1;", [id])).rows[0].preview;
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	if(!preview) return NextResponse.json("OK");

	try {
		await db.query("UPDATE projects SET preview = $1 where id = $2;", ["", id]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await fs.rm(path.join(rootFolder, "public", preview));
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})