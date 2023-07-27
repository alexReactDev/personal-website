import "server-only";
import Image from "next/image";

import db from "@/model/db.js";

async function About() {
	const about = (await db.query(`SELECT text from about;`)).rows[0].text;

	return (
		<div className="container">
			<section className="my-5 card p-3 md:min-h-[324px] text-center md:text-left">
				<div className="w-[220px] xm:w-[300px] h-[200px] xm:h-[300px] mx-auto mb-3 md:float-left md:mr-5 border-solid border border-gray-400 shadow">
					<Image src="/images/about/picture.jpg" width={300} height={400} alt="robot" className="w-full h-full object-cover object-center" />
				</div>
				<h1 className="title">
					About me
				</h1>
				<p>
					{about}
				</p>
			</section>
		</div>
	)
}

export default About;