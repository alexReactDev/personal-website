"use client"

import useCustomSWR from "@/hooks/useCustomSWR";
import { IProject } from "@/types/IProject";
import axios from "axios";
import { useFormik } from "formik";

interface IProps {
	className?: string,
	onError: (message: string) => void,
	onSuccess?: () => void,
	mutate?: ()	=> void
}

function AddSkill({ className = "", onError, onSuccess, mutate }: IProps) {

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
				mutate && mutate()
				formik.resetForm();
			} catch(e: any) {
				console.log(e);
				onError(e.response.body || e.message || "Unknown error")
			}
		}
	})

	return (
		<div className={`${className}`}>
			<h3 className="mb-3 text-xl font-bold text-center lg:text-left">
				Add skill
			</h3>
			<form onSubmit={formik.handleSubmit} className="flex flex-col items-center lg:flex-row">
				<div className="mb-5 lg:mb-0 lg:w-2/3">
					<div className="mb-3">
						<input
							type="text"
							name="name"
							id="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
							data-testid="skill-text-input"
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
							data-testid="skill-project-select"
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
							data-testid="skill-scope-select"
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
				<div className="lg:w-1/3 flex justify-center items-center">
					<input
						type="submit"
						value="Add"
						className="btn py-2 px-4"
						data-testid="skill-submit"
					/>
				</div>
			</form>
		</div>
	)
}

export default AddSkill;