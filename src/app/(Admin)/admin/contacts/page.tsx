"use client"

import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";
import Success from "@/components/SuccessMessage";
import useCustomSWR from "@/hooks/useCustomSWR";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";

function Contacts() {

	const [ errorMessage, setErrorMessage ] = useState("");
	const [ success, setSuccess ] = useState(false);

	const { data, isLoading } = useCustomSWR("/api/contacts");

	const formik = useFormik({
		initialValues: {
			phone: "",
			email: "",
			linkedin: "",
			github:  "",
			skype: "",
			messengers: ""
		},
		async onSubmit(values) {
			if(!haveValuesChanged(values)) return;

			try {
				axios.put("/api/contacts", values);
				setSuccess(true);
			}
			catch(e: any) {
				console.log(e);
				setErrorMessage(e.response.data || e.message || "Unknown error");
			}
		}
	})

	useEffect(() => {
		if(data) formik.setValues(data);
	}, [data])

	function haveValuesChanged(values: any) {
		for(let key in values) {
			if(data[key] !== values[key]) return true;
		}

		return false;
	}

	if( isLoading ) return <Loader />

	return (
		<div className="container">
			<div className="py-4">
				<h1 className="title">
					Contacts
				</h1>
				{
					success && <Success />
				}
				{
					errorMessage && <ErrorMessage errorMessage={errorMessage} />
				}
				<form onSubmit={formik.handleSubmit}>
					<div className="flex mb-5">
						<ul className="w-1/2">
							<li className="relative mb-4 pl-8">
								<div className="absolute left-0 top-0 w-[24px]">
									<Image src="/images/icons/phone.png" width={24} height={24} alt="phone icon" />
								</div>
								<label htmlFor="phone" className="block mb-2">
									Phone
								</label>
								<input
									type="tel"
									name="phone"
									id="phone"
									value={formik.values.phone}
									onChange={formik.handleChange}
									className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
								/>
							</li>
							<li className="relative mb-4 pl-8">
								<div className="absolute left-0 top-0 w-[24px]">
									<Image src="/images/icons/linkedin.png" width={24} height={24} alt="phone icon" />
								</div>
								<label htmlFor="linkedin" className="block mb-2">
									LinkedIn
								</label>
								<input
									type="text"
									name="linkedin"
									id="linkedin"
									value={formik.values.linkedin}
									onChange={formik.handleChange}
									className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
								/>
							</li>
							<li className="relative mb-4 pl-8">
								<div className="absolute left-0 top-0 w-[24px]">
									<Image src="/images/icons/skype.png" width={24} height={24} alt="phone icon" />
								</div>
								<label htmlFor="skype" className="block mb-2">
									Skype
								</label>
								<input
									type="text"
									name="skype"
									id="skype"
									value={formik.values.skype}
									onChange={formik.handleChange}
									className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
								/>
							</li>
						</ul>
						<ul className="w-1/2">
							<li className="relative mb-4 pl-8">
								<div className="absolute left-0 top-0 w-[24px]">
									<Image src="/images/icons/email.png" width={24} height={24} alt="phone icon" />
								</div>
								<label htmlFor="email" className="block mb-2">
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
								/>
							</li>
							<li className="relative mb-4 pl-8">
								<div className="absolute left-0 top-0 w-[24px]">
									<Image src="/images/icons/github.png" width={24} height={24} alt="phone icon" />
								</div>
								<label htmlFor="github" className="block mb-2">
									Github
								</label>
								<input
									type="text"
									name="github"
									id="github"
									value={formik.values.github}
									onChange={formik.handleChange}
									className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
								/>
							</li>
							<li className="relative mb-4 pl-8">
								<div className="absolute left-0 top-0 w-[24px]">
									<Image src="/images/icons/telegram.png" width={24} height={24} alt="phone icon" />
								</div>
								<label htmlFor="messengers" className="block mb-2">
									Messengers
								</label>
								<input
									type="text"
									name="messengers"
									id="messengers"
									value={formik.values.messengers}
									onChange={formik.handleChange}
									className="min-w-[300px] border border-solid border-gray-300 px-3 py-1"
								/>
							</li>
						</ul>
					</div>
					<div className="">
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

export default Contacts;