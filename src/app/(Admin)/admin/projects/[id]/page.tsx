"use client"

import Loader from "@/components/Loader";
import Success from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import axios from "axios";
import { useFormik } from "formik";
import { notFound, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectSkills from "@/components/SelectSkill";
import EditProjectImages from "@/components/EditProjectImages";
import { ImgData } from "@/types/IImgData";
import AddProjectImages from "@/components/AddProjectImages";
import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
	name: Yup.string().required("Field name is required"),
	title: Yup.string().required("Field title is required"),
	date: Yup.string().required("Field date is required"),
	link: Yup.string(),
	description: Yup.string().required("Field description is required")
})

function Project() {
	const projectId = useParams().id as string;

	const [ selectedSkills, setSelectedSkills ] = useState<string[]>([]);
	const [ projectLoading, setProjectLoading ] = useState(true);
	const [ errorMessage, setErrorMessage ] = useState("");
	const [ success, setSuccess ] = useState(false);
	const [ uploadPreview, setUploadPreview ] = useState<ImgData | null>(null);
	const [ uploadImages, setUploadImages ] = useState<ImgData[]>([]);
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: "",
			title: "",
			date: "",
			link: "",
			description: ""
		}, 
		validationSchema: ProjectSchema,
		async onSubmit(values) {
			if(selectedSkills.length === 0) return setErrorMessage("Select at least one skill");

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
				await axios.delete(`/api/projects/${projectId}`);
				setSuccess(true);
				router.push("/admin/projects");
			} catch (e: any) {
				console.log(e);
				setErrorMessage(e?.response?.data || e.message || "Unknown error");
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
				<div className="lg:flex mb-5">
					<div className="lg:w-2/3 box-border lg:pr-8 mb-5 lg:mb-0">
						{
							projectId === "new"
							?
							<AddProjectImages
								setUploadImages={(images) => setUploadImages(images)} 
								setUploadPreview={(preview) => setUploadPreview(preview)}
								onError={(e) => setErrorMessage(e)}
							/>
							:
							<EditProjectImages 
								projectId={projectId} 
								setUploadImages={(images) => setUploadImages(images)} 
								setUploadPreview={(preview) => setUploadPreview(preview)}
								onSuccess={() => setSuccess(true)} 
								onError={(e) => setErrorMessage(e)}
							/>
						}

					</div>
					<div className="lg:w-1/3">
						<div className="mb-5">
							<label htmlFor="name" className="block font-bold mb-2">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`${formik.errors.name && formik.touched.name ? "invalid" : ""} w-full border border-solid border-gray-300 px-3 py-1`}
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="link" className="block font-bold mb-2">Link</label>
							<input
								type="text"
								name="link"
								id="link"
								value={formik.values.link}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
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
								onBlur={formik.handleBlur}
								className={`${formik.errors.title && formik.touched.title ? "invalid" : ""} w-full border border-solid border-gray-300 px-3 py-1`}
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
								onBlur={formik.handleBlur}
								className={`${formik.errors.date && formik.touched.date ? "invalid" : ""} w-full border border-solid border-gray-300 px-3 py-1`}
							/>
						</div>
					</div>
				</div>
				<div className="mb-5">
					<label htmlFor="description" className="block mb-2 font-bold text-xl">
						Description
					</label>
					<textarea
						name="description"
						id="description"
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className={`${formik.errors.description && formik.touched.description ? "invalid" : ""} w-full border border-solid border-gray-300 px-3 py-1`}
					/>
				</div>
				<div className="flex flex-col items-center xm:flex-row justify-center gap-3 xm:gap-5">
					<button 
						type="button"
						disabled={projectId === "new"}
						onClick={deleteHandler}
						className="w-1/3 py-3 text-white font-bold bg-red-500 rounded shadow active:relative active:top-[1px] disabled:bg-gray-400 disabled:static"
						data-testid="edit-project-delete"
						>
						Delete project
					</button>
					<input
						type="submit"
						value="Confirm edit"
						className="btn w-1/3 py-3"
						data-testid="edit-project-submit"
					/>
				</div>
			</form>
		</div>
	)
}

export default Project;