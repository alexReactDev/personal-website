import "server-only";
import { IProject } from "@/types/IProject";
import Link from "next/link";
import BtnLink from "./BtnLink";
import { GetShowcaseProjects } from "@/misc/getShowcaseProjects";

async function Showcase() {
	const projects = await GetShowcaseProjects();

	return (
		<section className="fullscreen bg-gray-50">
			<div className="container">
				<div className="min-h-screen flex flex-col justify-center items-center text-center gap-1 xm:gap-5 lg:gap-24">
					<h2 className="title">
						My projects
					</h2>
					<ul className="flex flex-col items-center lg:items-stretch gap-4 xm:gap-8 lg:gap-0 lg:flex-row">
						{
							projects.map((project: IProject) => {
								return (
									<li key={project.id} className="w-full xm:w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 flex justify-center lg:px-5">
										<div className="w-5/6 flex flex-col items-center text-center border-solid border border-gray-200 rounded-lg p-4 bg-white shadow">
											<Link href={`/projects/${project.id}`} className="flex justify-center items-center mb-4 border-solid border border-gray-200 w-[100px] h-[100px]">
												<img src={project.preview || "/images/icons/placeholder.png"} width={100} height={100} alt={`${project.name} preview`} className="w-full h-full object-cover object-center" />
											</Link>
											<Link href={`/projects/${project.id}`}>
												<h4 className="title">
													{project.name}
												</h4>
											</Link>
											<p>
												{project.title}
											</p>
										</div>
									</li>
								)
							})
						}
					</ul>
					<BtnLink href="/projects" text="More →" className="mt-7" />
				</div>
			</div>
		</section>
	)
}

export default Showcase;