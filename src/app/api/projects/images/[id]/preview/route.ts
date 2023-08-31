import { NextRequest, NextResponse } from "next/server";
import ApiMiddleware from "@/middleware/apiMiddleware";
import db from "@/model/db.js";
import s3 from "@/model/s3.js";


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
	const extname = data.name.match(/\.\w+$/);

	try {
		let preview = (await db.query("SELECT preview FROM projects where id = $1;", [id])).rows[0].preview;

		console.log(preview.match(/\/[^\/]+$/)[0]);

		if(preview) await s3.deleteObject({
			Bucket: process.env.AWS_BUCKET as string,
			Key: preview.match(/\/[^\/]+$/)[0]
		}).promise()

	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	let location;

	try {
		const file = Buffer.from(data.data, "binary");

		location = (await s3.upload({
			Bucket: process.env.AWS_BUCKET as string,
			Key: `preview-${id}${extname}`,
			Body: file
		}).promise()).Location;

	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await db.query("UPDATE projects SET preview = $1 where id = $2;", [location, id]);
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
		await s3.deleteObject({
			Bucket: process.env.AWS_BUCKET as string,
			Key: preview.match(/\/[^\/]+$/)[0]
		}).promise();
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})