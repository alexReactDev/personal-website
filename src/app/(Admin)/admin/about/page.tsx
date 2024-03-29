"use client"

import ErrorMessage from "@/components/ErrorMessage";
import Success from "@/components/SuccessMessage";
import useCustomSWR from "@/hooks/useCustomSWR";
import { ImgData } from "@/types/IImgData";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";

function About() {
	const [ uploadImage, setUploadImage ] = useState<ImgData | null>(null);
	const imageRef = useRef<HTMLInputElement>(null);
	const [ errorMessage, setErrorMessage ] = useState("");
	const [ success, setSuccess ] = useState(false);
	const { data: imageUrl, mutate } = useCustomSWR("/api/about/image");

	const formik = useFormik({
		initialValues: {
			text: "",
		},
		async onSubmit(values) {
			try {
				await axios.put("/api/about", values);
			}
			catch(e: any) {
				console.log(e);
				setErrorMessage(e.response.data || e.message || "Unknown error");
				return;
			}

			if(uploadImage) {
				try {
					await axios.put("/api/about/image", { data: uploadImage });
				}
				catch(e: any) {
					console.log(e);
					setErrorMessage(e.response.data || e.message || "Unknown error");
					return;
				}

				mutate();
			}

			setSuccess(true);
		}
	})

	useEffect(() => {
		(async () => {
			const data = await fetch("/api/about").then((res) => res.json());
			formik.setFieldValue("text", data.text);
		})();
	}, [])

	function handleImageUpload() {
		if(!imageRef.current) return;

		const file = imageRef.current.files![0];

		if(!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			setUploadImage({
				name: file.name,
				data: e.target!.result as string
			});
		}
		reader.onerror = (e) => {
			console.log(e);
			setErrorMessage("Failed to process file");
		}
		reader.readAsBinaryString(file);
	}

	return (
		<div className="container">
			<div className="py-5">
				<h1 className="title">
					About
				</h1>
				{
					success && <Success />
				}
				{
					errorMessage && <ErrorMessage errorMessage={errorMessage} />
				}
				<form onSubmit={formik.handleSubmit}>
					<div className="lg:flex mb-5">
						<div className="lg:w-1/3 box-border lg:pr-8 mb-5 lg:mb-0 flex flex-col items-center">
							<div className="w-[220px] xm:w-[300px] h-[200px] xm:h-[300px] mb-5 border-solid border border-gray-400 shadow">
								<img src={imageUrl} width={300} height={300} alt="some nice picture" className="w-full h-full object-cover object-center" />
							</div>
							<div className="flex justify-center">
								<input
									type="file"
									name="picture"
									id="picture"
									accept="image/*"
									ref={imageRef}
									onChange={handleImageUpload}
								/>
							</div>
						</div>
						<div className="lg:w-2/3">
							<textarea 
								name="text"
								id="text"
								value={formik.values.text}
								onChange={formik.handleChange}
								className="h-full w-full box-border border border-solid border-gray-300 p-2"
								></textarea>
						</div>
					</div>
					<div className="flex justify-center">
						<input
							type="submit"
							value="Confirm"
							className="btn py-2 px-3"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default About;