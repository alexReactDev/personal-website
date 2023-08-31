"use client"

import AsideLayout from "@/components/AsideLayout";
import Loader from "@/components/Loader";
import Select from "@/components/Select";
import Spoiler from "@/components/Spoiler";
import useCustomSWR from "@/hooks/useCustomSWR";
import { IProjectWithSkills } from "@/types/IProject";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Projects() {
	const [ selectedSkills, setSelectedSkills ] = useState<string[]>([]);

	const { data: skills = []} = useCustomSWR("/api/skills");
	const { data: projects = [], isLoading } = useCustomSWR("/api/projects");
	
	function filterer(project: IProjectWithSkills) {
		if(selectedSkills.length === 0) return true;

		for (let skill of selectedSkills) {
			if(project.skills.includes(skill)) return true;
		}

		return false;
	}

	return (
		<div className="container">
			<AsideLayout aside={
			<div>
				<h2 className="mb-2 font-bold text-xl text-center">
					Skills
				</h2>
				<Spoiler>
					<Select items={skills} selectedItems={selectedSkills} setSelectedItems={(selectedItems) => setSelectedSkills(selectedItems)} />
				</Spoiler>
			</div>
		} className="my-5">
				<div className="card p-3">
					<h1 className="title text-center lg:text-left">
						My projects
					</h1>
					{
						isLoading && <Loader />
					}
					<ul className="flex flex-wrap gap-y-6 justify-center lg:justify-start">
						{
							projects.filter(filterer).map((project: IProjectWithSkills) => {
								return (
									<li key={project.id} className="xm:w-1/2 sm:!w-1/3 lg:!w-1/4 box-border flex justify-center px-2">
										<div className="flex flex-col items-center text-center">
											<div className="w-[100px] h-[100px] box-border border border-solid border-gray-200 mb-3">
												<Link href={`/projects/${project.id}`}>
													<img width={100} height={100} src={project.preview || "/images/icons/placeholder.png"} alt={project.name} className="w-full h-full object-cover object-center" loading="lazy"/>
												</Link>
											</div>
											<h4 className="mb-2 font-bold">
												<Link href={`/projects/${project.id}`}>
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
				</div>
			</AsideLayout>
		</div>
	)
}

export default Projects;