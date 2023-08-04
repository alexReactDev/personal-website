"use client"
import { ImgData } from "@/types/IImgData";
import { useRef } from "react";

interface IProps {
	className?: string,
	accept?: string,
	onChange: (file: ImgData) => void,
	onError: (error: string) => void
}

function SingleFileInput({ className = "", accept = "*", onChange, onError }: IProps) {
	const fileRef = useRef<HTMLInputElement>(null);

	function handleFile() {
		if(!fileRef.current) return;

		const file = fileRef.current.files![0];

		if(!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			onChange({
				name: file.name,
				data: e.target!.result as string
			});
		}
		reader.onerror = (e) => {
			console.log(e);
			onError("Failed to process file");
		}
		reader.readAsBinaryString(file);
	}

	return (
		<input
			type="file"
			accept={accept}
			ref={fileRef}
			onChange={handleFile}
			className={`${className}`}
		/>
	)
}

export default SingleFileInput;