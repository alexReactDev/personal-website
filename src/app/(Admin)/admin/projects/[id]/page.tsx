"use client"

import Loader from "@/components/Loader";
import Success from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectSkills from "@/components/SelectSkill";
import EditProjectImages from "@/components/EditProjectImages";
import { ImgData } from "@/types/IImgData";

function Project() {
	const projectId = useParams().id as string;

	const [ selectedSkills, setSelectedSkills ] = useState<string[]>([]);
	const [ projectLoading, setProjectLoading ] = useState(true);
	const [ errorMessage, setErrorMessage ] = useState("");
	const [ success, setSuccess ] = useState(false);
	const [ uploadPreview, setUploadPreview ] = useState<ImgData | null>(null);
	const [ uploadImages, setUploadImages ] = useState<ImgData[]>([]);

	const formik = useFormik({
		initialValues: {
			name: "",
			title: "",
			date: "",
			description: ""
		}, 
		async onSubmit(values) {
			let id = projectId;

			if(projectId === "new") {
				try {
					id = (await axios.post(`/api/projects`, {...values, skills: selectedSkills})).data;
				} catch (e: any) {
					console.log(e);
					setErrorMessage(e.response.data || e.message || "Unknown error");
					return;
				}
			}
			else {
				try {
					await axios.put(`/api/projects/${projectId}`, {...values, skills: selectedSkills});
				} catch (e: any) {
					console.log(e);
					setErrorMessage(e.response.data || e.message || "Unknown error");
					return;
				}
			}

			if(uploadPreview) {
				try {
					await axios.put(`/api/projects/images/${id}/preview`, { data: uploadPreview });
				} catch (e: any) {
					console.log(e);
					setErrorMessage(e.response.data || e.message || "Unknown error");
					return;
				}
			}

			if(uploadImages.length > 0) {
				try {
					await axios.post(`/api/projects/images/${id}`, { data: uploadImages });
				} catch (e: any) {
					console.log(e);
					setErrorMessage(e.response.data || e.message || "Unknown error");
					return;
				}
			}

			setSuccess(true);
		}
	})

	useEffect(() => {
		(async () => {
			if(projectId === "new") {
				setProjectLoading(false);
				return;
			}

			const project = await (await fetch(`/api/projects/${projectId}`)).json();

			setSelectedSkills(project.skills);

			formik.setValues(project);

			setProjectLoading(false);
		})();
	}, []);

	async function deleteHandler(e: any) {
		e.stopPropagation();

		if(confirm(`Are you sure, you want to delete project ${formik.values.name}?`)) {
			try {
				console.log("Delete project");
				await axios.delete(`/api/projects/${projectId}`);
				setSuccess(true);
			} catch (e: any) {
				console.log(e);
				setErrorMessage(e.response.data || e.message || "Unknown error");
			}
		}
	}

	if(projectLoading) return <Loader />

	return (
		<div className="container">
			<form onSubmit={formik.handleSubmit} className="py-5">
				<h1 className="title">
					{
						projectId === "new"
						?
						"New project"
						:
						`Edit project "${formik.values.name}"`
					}
				</h1>
				{
					success && <Success />
				}
				{
					errorMessage && <ErrorMessage errorMessage={errorMessage} />
				}
				<div className="flex mb-5">
					<div className="w-2/3 box-border pr-8">
						<EditProjectImages 
							projectId={projectId} 
							setUploadImages={(images) => setUploadImages(images)} 
							setUploadPreview={(preview) => setUploadPreview(preview)}
							onSuccess={() => setSuccess(true)} 
							onError={(e) => setErrorMessage(e)}
						/>
					</div>
					<div className="w-1/3">
						<div className="mb-5">
							<label htmlFor="name" className="block font-bold mb-2">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								className="w-full border border-solid border-gray-300 px-3 py-1"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="title" className="block font-bold mb-2">Title (short description)</label>
							<textarea
								name="title"
								id="title"
								value={formik.values.title}
								onChange={formik.handleChange}
								className="w-full border border-solid border-gray-300 px-3 py-2"
							></textarea>
						</div>
						<div className="mb-5">
							<h3 className="font-bold mb-2">
								Skills
							</h3>
							<SelectSkills selected={selectedSkills} onSelect={(skills) => setSelectedSkills(skills)}/>
						</div>
						<div className="mb-5">
							<label htmlFor="date" className="block font-bold mb-2">Date</label>
							<input
								type="text"
								name="date"
								id="date"
								value={formik.values.date}
								onChange={formik.handleChange}
								className="w-full border border-solid border-gray-300 px-3 py-1"
							/>
						</div>
					</div>
				</div>
				<div className="mb-5">
					<h2 className="mb-2 font-bold text-xl">
						Description
					</h2>
					<textarea
						name="description"
						id="description"
						value={formik.values.description}
						onChange={formik.handleChange}
						className="w-full border border-solid border-gray-300 px-3 py-2"
					/>
				</div>
				<div className="flex justify-center gap-5">
					<button 
						type="button"
						disabled={projectId === "new"}
						onClick={deleteHandler}
						className="w-1/3 py-3 text-white font-bold bg-red-500 rounded shadow active:relative active:top-[1px] disabled:bg-gray-400 disabled:static" 
						>
						Delete project
					</button>
					<input
						type="submit"
						value="Confirm edit"
						className="btn w-1/3 py-3"
					/>
				</div>
			</form>
		</div>
	)
}

export default Project;