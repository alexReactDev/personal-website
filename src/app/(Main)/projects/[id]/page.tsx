import "server-only";
import db from "@/model/db.js";
import ProjectPreview from "@/components/ProjectPreview";
import Link from "next/link";

async function Project({ params }: { params: { id: string }}) {
	const project = (await db.query("SELECT * FROM projects where id = $1;", [params.id])).rows[0];
	const skills = (await db.query("SELECT * FROM projects_skills where project_id = $1;", [params.id])).rows;
	const pictures = (await db.query("SELECT * FROM projects_images where project_id = $1;", [params.id])).rows.map((pictureObj: { img: string }) => pictureObj.img);

	return (
		<div className="container">
			<section className="my-5 p-3 card">
				<div className="lg:flex mb-5">
					<div className="mb-6 lg:mb-0 lg:w-1/2">
						<ProjectPreview pictures={[project.preview || "/images/icons/placeholder.png", ...pictures]} />
					</div>
					<div className="lg:w-1/2 box-border pl-5">
						<h1 className="title">
							{project.name}
						</h1>
						<p className="mb-4">
							{project.title}
						</p>
						{
							project.link &&
							<p className="mb-4">
								<span className="font-bold mr-1">Deployed project:</span>
								<Link href={project.link} className="hover:underline active:text-purple-700">
									{project.link}
								</Link>
							</p>
						}
						{
							project.repo &&
							<p className="mb-4">
								<span className="font-bold mr-1">Repo:</span>
								<Link href={project.repo} className="hover:underline active:text-purple-700">
									{project.repo}
								</Link>
							</p>
						}
						<div className="mb-4">
							<h3 className="font-bold mb-2">
								Tech stack
							</h3>
							<ul className="px-5">
								{
									skills.map((skill: { id: string, skill: string}) => {
										return (
											<li key={skill.id} className="mb-2 list-disc">
												{skill.skill}
											</li>
										)
									})
								}
							</ul>
						</div>
						<p>
							<span className="font-bold mr-1">Date of work:</span> {project.date}
						</p>
					</div>
				</div>
				<section>
					<h2 className="title">
						Description
					</h2>
					<p>
						{project.description}
					</p>
				</section>
			</section>
		</div>
	)
}

export default Project;