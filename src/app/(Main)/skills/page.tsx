"use client"

import AsideLayout from "@/components/AsideLayout";
import Loader from "@/components/Loader";
import Select from "@/components/Select";
import Spoiler from "@/components/Spoiler";
import useCustomSWR from "@/hooks/useCustomSWR";
import ISkillWithScopes from "@/types/ISkill";
import { useState } from "react";

function Projects() {
	const [ selectedScopes, setSelectedScopes ] = useState<string[]>([]);

	const { data: scopes = []} = useCustomSWR("/api/scopes");
	const { data: skills = [], isLoading } = useCustomSWR("/api/skills/withscopes");
	
	function filterer(skill: ISkillWithScopes) {
		if(selectedScopes.length === 0) return true;

		for (let scope of selectedScopes) {
			if(skill.scopes.includes(scope)) return true;
		}

		return false;
	}

	return (
		<div className="container">
			<AsideLayout aside={
			<div>
				<h2 className="mb-2 font-bold text-xl text-center">
					Scope
				</h2>
				<Spoiler>
					<Select items={scopes} selectedItems={selectedScopes} setSelectedItems={(selectedItems) => setSelectedScopes(selectedItems)} />
				</Spoiler>
			</div>
		} className="my-5">
				<div className="card p-3">
					<h1 className="title text-center lg:text-left">
						My skills
					</h1>
					{
						isLoading && <Loader />
					}
					<ul className="px-5 flex flex-wrap gap-y-4">
						{
							skills.filter(filterer).map((skill: ISkillWithScopes) => {
								return (
									<li key={skill.name} className="w-full sm:w-1/2 md:w-1/3 box-border px-3 flex justify-center text-center sm:block sm:text-left">
										<p className="relative pl-[15px] before:w-[5px] before:h-[5px] before:bg-black before:rounded-full before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0">
											{skill.name}
										</p>
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