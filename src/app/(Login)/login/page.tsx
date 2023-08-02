"use client"

import axios from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Login() {

	const [error, setError] = useState("");
	const [showMessage, setShowMessage] = useState(false);

	const router = useRouter();
	const from = useSearchParams().get("from");

	const formik = useFormik({
		initialValues: {
			password: ""
		},
		async onSubmit(values) {
			try {
				await axios.post("/api/login", { password: values.password });
			}
			catch(e: any) {
				console.log(e);
				setError(e.response.data || e.message || "Unknown error")
				return;
			}

			setShowMessage(true);
			
			formik.resetForm();

			if(from) {
				router.push(from);
			}
			else {
				router.push("/admin");
			}
		}
	})

	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="w-[400px] border border-solid border-gray-300 rounded-sm p-3">
				<h1 className="title">
					Login
				</h1>
				<form onSubmit={formik.handleSubmit}>
					<div className="mb-5">
						{
							showMessage
							&& 
							<label htmlFor="password" className="block mb-5 px-3 py-2 text-center success">
								Success
							</label>
						}
						{
							error 
							&& 
							<label htmlFor="password" className="block mb-5 error px-3 py-2 text-center">
								{error}
							</label>
						}
						<label htmlFor="password" className="block mb-3">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							className="w-full box-border border border-solid border-gray-200 rounded-sm py-2 px-3"
						/>
					</div>
					<div className="flex justify-center">
						<input
							type="submit"
							disabled={!!error}
							value="Login"
							className="btn py-3 px-5"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login;