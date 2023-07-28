"use client"

import AddSkill from "@/components/AddSkill";
import AsideLayout from "@/components/AsideLayout";
import Cross from "@/components/Cross";
import DeleteItem from "@/components/DeleteItem";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import Success from "@/components/SuccessMessage";
import useCustomSWR from "@/hooks/useCustomSWR";
import axios from "axios";
import { useState } from "react";

function Skills() {
	const [ success, setSuccess ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState("");

	const { data: scopes, isLoading: isScopesLoading } = useCustomSWR("/api/scopes");
	const { data: skills, isLoading } = useCustomSWR("/api/skills");

	async function deleteScope(scope: string) {
		try {
			await axios.delete(`/api/scopes/${scope}`);
			setSuccess(true);
		} catch (e: any) {
			console.log(e);
			setErrorMessage(e.response.body || e.message || "Unknown error");
		}
	}

	async function deleteSkill(skill: string) {
		try {
			await axios.delete(`/api/skills/${skill}`);
			setSuccess(true);
		} catch (e: any) {
			console.log(e);
			setErrorMessage(e.response.body || e.message || "Unknown error");
		}
	}

	if(isScopesLoading || isLoading) return <Loader />

	return (
		<div className="container">
			<div className="py-5">
				<h1 className="title">
					Skills
				</h1>
			{
				success && <Success />
			}
			{
				errorMessage && <ErrorMessage errorMessage={errorMessage} />
			}
			<AsideLayout aside={<DeleteItem items={scopes} onDelete={(scope) => {deleteScope(scope)}} />}>
				<ul className="mb-6 px-5 flex flex-wrap gap-y-4">
					{
						skills.map((skill: string) => {
							return (
								<li key={skill} className="group w-full sm:w-1/2 md:w-1/3 box-border px-3 flex justify-center items-center text-center lg:justify-between sm:text-left gap-2">
									<p className="relative pl-[15px] before:w-[5px] before:h-[5px] before:bg-black before:rounded-full before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0">
										{skill}
									</p>
									<Cross className="shrink-0 opacity-0 invisible group-[:hover]:opacity-100 group-[:hover]:visible" onClick={() => deleteSkill(skill)} />
								</li>
							)
						})
					}
				</ul>
				<AddSkill onError={(message) => setErrorMessage(message)} onSuccess={() => setSuccess(true)} />
			</AsideLayout>
			</div>
		</div>
	)
}

export default Skills;