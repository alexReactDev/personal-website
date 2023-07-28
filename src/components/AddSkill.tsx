"use client"

import useCustomSWR from "@/hooks/useCustomSWR";
import { IProject } from "@/types/IProject";
import axios from "axios";
import { useFormik } from "formik";

interface IProps {
	className?: string,
	onError: (message: string) => void,
	onSuccess?: () => void	
}

function AddSkill({ className = "", onError, onSuccess }: IProps) {

	const { data: projects = [] } = useCustomSWR("/api/projects");
	const { data: scopes = [] } = useCustomSWR("/api/scopes");

	const formik = useFormik({
		initialValues: {
			name: "",
			projects: "",
			scopes: ""
		},
		async onSubmit(values) {
			try {
				await axios.post("/api/skills", values);
				onSuccess && onSuccess()
				formik.resetForm();
			} catch(e: any) {
				console.log(e);
				onError(e.response.body || e.message || "Unknown error")
			}
		}
	})

	return (
		<div className={`${className}`}>
			<h3 className="mb-3 text-xl font-bold">
				Add skill
			</h3>
			<form onSubmit={formik.handleSubmit} className="flex">
				<div className="w-2/3">
					<div className="mb-3">
						<input
							type="text"
							name="name"
							id="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
						/>
					</div>
					<div className="mb-3">
						<select
							name="projects"
							id="projects"
							multiple
							value={formik.values.projects}
							onChange={formik.handleChange}
							className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
						>
							{
								projects.map((project: IProject) => {
									return (
										<option key={project.id} value={project.id}>
											{project.name}
										</option>
									)
								})
							}
						</select>
					</div>
					<div>
						<select
							name="scopes"
							id="scopes"
							multiple
							value={formik.values.scopes}
							onChange={formik.handleChange}
							className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
						>
							{
								scopes.map((scope: string) => {
									return (
										<option key={scope} value={scope}>
											{scope}
										</option>
									)
								})
							}
						</select>
					</div>
				</div>
				<div className="w-1/3 flex justify-center items-center">
					<input
						type="submit"
						value="Add"
						className="btn py-2 px-4"
					/>
				</div>
			</form>
		</div>
	)
}

export default AddSkill;