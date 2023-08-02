"use client"

import Cross from "@/components/Cross";
import ErrorMessage from "@/components/ErrorMessage";
import Success from "@/components/SuccessMessage";
import { IProject } from "@/types/IProject";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Admin() {
	const [ showcaseProjects, setShowcaseProjects ] = useState<IProject[]>([]);
	const [ selectedProject, setSelectedProject ] = useState<string | null>(null);
	const [ showSelect, setShowSelect ] = useState(false);
	const [ projects, setProjects ] = useState([]);
	const [ errorMessage, setErrorMessage ] = useState("");
	const [ success, setSuccess ] = useState(false);

	useEffect(() => {
		(async () => {
			const data = await fetch("/api/showcase").then((res) => res.json());
			setShowcaseProjects(data);
		})();
	}, [success, errorMessage])

	async function displaySelect() {
		if(projects.length === 0) {
			const projects = await fetch("/api/projects").then((res) => res.json());
			setProjects(projects);
		}

		setShowSelect(true);
	}

	async function addProject() {
		if(!selectedProject) return;

		try {
			await axios.post("/api/showcase", { project_id: selectedProject});
			setSuccess(true);
		}
		catch(e: any) {
			console.log(e);
			setErrorMessage(e.response.data || e.message || "Unknown error");
		}
	}

	async function deleteProject(id: number) {
		try {
			await axios.delete(`/api/showcase/${id}`);
			setSuccess(true);
		}
		catch(e: any) {
			console.log(e);
			setErrorMessage(e.response.data || e.message || "Unknown error");
		}
	}

	return (
		<div className="container">
			<div className="py-5">
				<h1 className="title">
					Home page (Showcase)
				</h1>
				{
					success && <Success />
				}
				{
					errorMessage && <ErrorMessage errorMessage={errorMessage} />
				}
				<ul className="mb-5 flex flex-col items-center lg:items-stretch gap-4 xm:gap-8 lg:gap-0 lg:flex-row text-center">
					{
						showcaseProjects.map((project: IProject) => {
							return (
								<li key={project.id} className="xm:w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 flex justify-center lg:px-5">
									<div className="relative group w-5/6 flex flex-col items-center text-center border-solid border border-gray-200 rounded-lg p-4 bg-white shadow">
										<div 
											onClick={() => deleteProject(project.id)}
											className="absolute opacity-0 invisible group-[:hover]:opacity-100 group-[:hover]:visible -top-[16px] w-[24px] h-[24px] flex justify-center items-center bg-gray-300 rounded-full duration-200"
										>
											<Cross className="rounded-full" />
										</div>
										<Link href={`/projects/${project.id}`} className="flex justify-center items-center mb-4 border-solid border border-gray-200 w-[100px] h-[100px]">
											<Image src={`/images/projects/${project.id}/preview.png`} width={100} height={100} alt={`${project.name} preview`} className="w-full h-full object-cover object-center" />
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
				<div>
					{
						showSelect &&
						<div className="mb-4 flex justify-center">
							<select className="w-1/3 border border-solid border-gray-300 px-3 py-1" onChange={(e) => setSelectedProject(e.target.value)} >
								{
									projects.map((proj: IProject) => {
										return (
											<option key={proj.id} value={proj.id}>
												{proj.name}
											</option>
										)
									})
								}
							</select>
						</div>
					}
					<div className="flex justify-center">
						<input
							type="button"
							value="Add project"
							className="btn w-1/4 py-2"
							onClick={showSelect ? addProject : displaySelect}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Admin;