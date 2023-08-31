import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";
import ApiMiddleware from "@/middleware/apiMiddleware";
import s3 from "@/model/s3";

export const DELETE = ApiMiddleware(async function (req: NextRequest, { params: { url, id }}:{ params: { url: string, id: string }}) {
	try {
		await db.query("DELETE FROM projects_images where img = $1;", [url]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await (s3.deleteObject({
			Bucket: process.env.AWS_BUCKET as string,
			Key: url.match(/\/[^\/]+$/)![0]
		}).promise());
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})