import "server-only";
import db from "@/model/db.js";
import { IProject } from "@/types/IProject";
import Image from "next/image";
import Link from "next/link";

async function Projects() {
	const projects = (await db.query("SELECT * FROM projects;")).rows;

	return (
		<div className="container">
			<div className="py-5">
				<h1 className="title">
					Projects
				</h1>
				<ul className="flex flex-wrap gap-y-6 justify-center lg:justify-start mb-8">
					{
						projects.map((project: IProject) => {
							return (
								<li key={project.id} className="xm:w-1/2 sm:!w-1/3 lg:!w-1/4 box-border flex justify-center px-2" data-testid="admin-project">
									<div className="flex flex-col items-center text-center">
										<div className="w-[100px] h-[100px] box-border border border-solid border-gray-200 mb-3">
											<Link href={`/admin/projects/${project.id}`}>
												<img width={100} height={100} src={project.preview || "/images/icons/placeholder.png"} alt={project.name} className="w-full h-full object-cover object-center" loading="lazy"/>
											</Link>
										</div>
										<h4 className="mb-2 font-bold">
											<Link href={`/admin/projects/${project.id}`}>
												{project.name}
											</Link>
										</h4>
										<p>
											{project.title.slice(0, 50) + "..."}
										</p>
									</div>
								</li>
							)
						})
					}
				</ul>
				<div className="flex justify-center">
					<Link href="/admin/projects/new" className="btn w-1/3 py-2 text-center" data-testid="admin-projects-new">
						New
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Projects;