"use client"
import { ImgData } from "@/types/IImgData";
import { useRef } from "react";

interface IProps {
	className?: string,
	accept?: string,
	onChange: (files: ImgData[]) => void,
	onError: (error: string) => void
}

function MultipleFileInput({ className = "", accept = "*", onChange, onError }: IProps) {
	const filesRef = useRef<HTMLInputElement>(null);

	function handleFiles() {
		if(!filesRef.current) return;

		const files = filesRef.current.files!;

		let images: ImgData[] = [];

		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			reader.onload = (e) => {
				images.push({
					name: files[i].name,
					data: e.target!.result as string
				});
			}
			reader.onerror = (e) => {
				console.log(e);
				onError("Failed to process file");
			}
			reader.readAsBinaryString(files[i]);
		}

		onChange(images);
	}

	return (
		<input
			type="file"
			accept={accept}
			ref={filesRef}
			multiple
			onChange={handleFiles}
			className={`${className}`}
		/>
	)
}

export default MultipleFileInput;