import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";
import { v4 } from "uuid";
import s3 from "@/model/s3";

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

			let location = (await s3.upload({
				Bucket: process.env.AWS_BUCKET as string,
				Key: hash + extname,
				Body: file
			}).promise()).Location;

			await db.query("INSERT INTO projects_images (project_id, img) values ($1, $2);", [id, location]);
		} catch (e: any) {
			console.log(e);
			return NextResponse.json(e, {
				status: 500
			})
		}
	}

	return NextResponse.json("OK");
}