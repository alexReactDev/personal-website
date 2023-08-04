"use client"
import Image from "next/image";
import { ImgData } from "@/types/IImgData";
import SingleFileInput from "./SingleFileInput";
import MultipleFileInput from "./MultipleFileInput";

interface IProps {
	className?: string,
	setUploadPreview: (preview: ImgData) => void,
	setUploadImages: (images: ImgData[]) => void,
	onError: (err: string) => void
}

function AddProjectImages({ className = "", setUploadPreview, setUploadImages, onError}: IProps) {
	return (
		<div className={`${className}`}>
			<div className="mb-2">
				<Image src="/images/icons/placeholder.png" width={415} height={380} alt="placeholder" className="w-full h-[240px] 2xm:h-[290px] xm:h-[380px] object-center object-cover" />
			</div>
			<div className="mb-6">
					<SingleFileInput accept="image/*" onChange={(file) => setUploadPreview(file)} onError={onError} />
			</div>
			<div className="flex justify-between gap-2 items-center mb-2">
				<div className="w-[25px] h-[80px] flex justify-center items-center bg-gray-700 before:border-solid before:border-b-white before:border-x-transparent before:border-b-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm before:-rotate-90" data-prev></div>
				<div>
					<Image src="/images/icons/placeholder.png" width={80} height={80} alt="placeholder" />
				</div>
				<div className="w-[25px] h-[80px] flex justify-center items-center bg-gray-700 before:border-solid before:border-t-white before:border-x-transparent before:border-t-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm before:-rotate-90" data-next></div>
			</div>
			<div className="">
					<MultipleFileInput accept="image/*,.mp4" onChange={(files) => setUploadImages(files)} onError={onError} />
			</div>
	</div>
	)
}

export default AddProjectImages;