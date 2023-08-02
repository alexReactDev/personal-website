import { NextRequest, NextResponse } from "next/server";
import db from "@/model/db.js";
import fs from "fs/promises";
import path from "path";
import ApiMiddleware from "@/middleware/apiMiddleware";

const rootFolder = __dirname.match(/.+?personal-website/)![0];

export const DELETE = ApiMiddleware(async function (req: NextRequest, { params: { url, id }}:{ params: { url: string, id: string }}) {
	try {
		await db.query("DELETE FROM projects_images where img = $1;", [url]);
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	try {
		await fs.rm(path.join(rootFolder, "public", url));
	} catch (e: any) {
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
})