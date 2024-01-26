import { NextRequest, NextResponse } from "next/server";
import ApiMiddleware from "@/middleware/apiMiddleware";
import { revalidatePath } from "next/cache";
import db from "@/model/db.js";
import s3 from "@/model/s3.js";

export const GET = async function() {
	let image;

	try {
		image = (await db.query("SELECT image FROM about;")).rows[0]?.image;
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	if(!image)	return NextResponse.json("Image not found", {
		status: 404
	})

	return NextResponse.json(image);
}

export const PUT = ApiMiddleware(async function (req: NextRequest) {
	const { data } = await req.json();

	let location;

	try {
		const oldExtname = (await db.query("SELECT image FROM about")).rows[0]?.image.match(/\.\w+$/);

		if(oldExtname) {
			await s3.deleteObject({
				Bucket: process.env.AWS_BUCKET as string,
				Key: `about${oldExtname}`
			}).promise();
		}

		const file = Buffer.from(data.data, "binary");
		const newExtname = data.name.match(/\.\w+$/);

		location = (await s3.upload({
			Key: `about${newExtname}`,
			Bucket: process.env.AWS_BUCKET as string,
			Body: file
		}).promise()).Location;

	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await db.query("UPDATE about SET image = $1;", [location])
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		revalidatePath("/(Main)/about");
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})