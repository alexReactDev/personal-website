import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const rootFolder = __dirname.match(/.+?personal-website/)![0];

export async function PUT(req: NextRequest, { params: { id }}:{ params: { id: string }}) {
	const { data } = await req.json();

	try {
		const extname = data.name.match(/\..+$/);
		const file = Buffer.from(data.data, "binary");
		await fs.writeFile(path.join(rootFolder, "public", "images", "projects", id, `preview${extname}`), file);
	} catch (e: any) {
		console.log(e);
		return NextResponse.json(e, {
			status: 500
		})
	}

	return NextResponse.json("OK");
}