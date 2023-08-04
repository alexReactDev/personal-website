"use client"

import axios from "axios";
import { useState } from "react"

interface IProps {
	className?: string,
	onSuccess?: () => void,
	onError?: (error: string) => void,
	mutate?: () => void
}

export default function AddScope({ className = "", onError, onSuccess, mutate }: IProps) {
	const [ displayInput, setDisplayInput ] = useState(false);
	const [ scopeName, setScopeName ] = useState("");

	async function submit() {
		if(!scopeName) return;

		try {
			await axios.post("/api/scopes", { data: scopeName});
			onSuccess && onSuccess();
			mutate && mutate()
			setScopeName("");
		}
		catch(e: any) {
			console.log(e);
			onError && onError(e.response.data || e.message || "Unknown error");
		}
	}

	return (
		<div className={`${className}`}>
			{
				displayInput &&
				<div className="mb-2">
					<input
						type="text"
						value={scopeName}
						onChange={(e) => setScopeName(e.target.value)}
						className="w-full border border-solid border-gray-300 px-3 py-1"
						data-testid="scope-input"
					/>
				</div>
			}
			<div className="flex justify-center">
				<input
					type="button"
					value="Add"
					className="w-1/2 btn border border-solid border-gray-300 px-3 py-1"
					onClick={() => displayInput ? submit() : setDisplayInput(true)}
					data-testid="scope-submit"
				/>
			</div>
		</div>
	)
}