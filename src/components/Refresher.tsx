"use client"

import axios from "axios";

interface IProps {
	className?: string,
	onError?: (error: any) => void,
	onSuccess?: () => void
}

function Refresher({ className = "", onError, onSuccess }: IProps) {
	function refresh() {
		try {
			axios.post("/api/revalidate?path=/", null, { withCredentials: true });
			onSuccess && onSuccess()
		} catch(e: any) {
			console.log(e);
			onError && onError(e);
		}
	}

	return (
		<div className="flex justify-center">
			<button 
				className="btn py-2 px-5"
				onClick={refresh}
			>
				Refresh website ♻
			</button>
		</div>
	)
}

export default Refresher;