"use client"

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import Image from "next/image";
import ImgWithCross from "./ImageWithCross";

import 'swiper/css';
import 'swiper/css/navigation';
import axios from "axios";
import { ImgData } from "@/types/IImgData";
import useCustomSWR from "@/hooks/useCustomSWR";
import SingleFileInput from "./SingleFileInput";
import MultipleFileInput from "./MultipleFileInput";

interface IProps {
	className?: string,
	projectId: string,
	setUploadPreview: (preview: ImgData) => void,
	setUploadImages: (images: ImgData[]) => void,
	onSuccess: () => void,
	onError: (err: string) => void
}

function EditProjectImages({ className = "", projectId, setUploadPreview, setUploadImages, onSuccess, onError}: IProps) {
	const [ noImage, setNoImage ] = useState(false);

	const { data: pictures = [], mutate } = useCustomSWR(`/api/projects/images/${projectId}`);
	const { data: preview = "", mutate: mutatePreview, isLoading } = useCustomSWR(`/api/projects/images/${projectId}/preview`);

	console.log(preview);
	console.log(pictures);

	async function deleteImage(img: string) {
		try {
			await axios.delete(`/api/projects/images/${projectId}/${encodeURIComponent(img)}`);
			onSuccess();
			mutate();
		} catch(e: any) {
			console.log(e);
			onError(e.response.data || e.message || "Unknown error");
		}
	}

	async function deletePreview() {
		try {
			await axios.delete(`/api/projects/images/${projectId}/preview`);
			onSuccess();
			mutatePreview();
		} catch(e: any) {
			console.log(e);
			onError(e.response.data || e.message || "Unknown error");
		}
	}

	return (
		<div className={`${className}`}>
			<div className="mb-2">
				{
					!preview || noImage || isLoading
					?
					<Image src="/images/icons/placeholder.png" width={415} height={380} alt="placeholder" className="w-full h-[240px] 2xm:h-[290px] xm:h-[380px] object-center object-cover" />
					:
					<div onError={(e: any) => e.target.tagName === "IMG" && setNoImage(true)}>
						<ImgWithCross 
							img={preview} 
							width={415} 
							height={380} 
							alt="preview"
							className="w-full h-[240px] 2xm:h-[290px] xm:h-[380px]" 
							onClick={deletePreview}
						/>
					</div>

				}
			</div>
			<div className="mb-6">
					<SingleFileInput accept="image/*" onChange={(file) => setUploadPreview(file)} onError={onError} />
			</div>
			<div className="flex justify-between gap-2 items-center mb-2">
				<div className="w-[25px] h-[80px] flex justify-center items-center bg-gray-700 before:border-solid before:border-b-white before:border-x-transparent before:border-b-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm before:-rotate-90" data-prev></div>
				<Swiper
					modules={[Navigation, Mousewheel]}
					slidesPerView={2}
					spaceBetween={5}
					className="grow"
					style={{maxWidth: "calc(100% - 58px)"}}
					centerInsufficientSlides
					mousewheel
					navigation={{
						nextEl: "[data-next]",
						prevEl: "[data-prev]",
						lockClass: "disabled"
					}}
					breakpoints={{
						375: {
							slidesPerView: 3
						},
						450: {
							slidesPerView: 4
						},
						560: {
							slidesPerView: 5
						}
					}}
				>
					{
						pictures.map((picture: string) => {
							return (
								<SwiperSlide key={picture}>
									<ImgWithCross img={picture} width={80} height={80} className="w-[80px] h-[80px]" onClick={deleteImage} />
								</SwiperSlide>
							)
						})
					}
				</Swiper>
				<div className="w-[25px] h-[80px] flex justify-center items-center bg-gray-700 before:border-solid before:border-t-white before:border-x-transparent before:border-t-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm before:-rotate-90" data-next></div>
			</div>
			<div className="">
					<MultipleFileInput accept="image/*,.mp4" onChange={(files) => setUploadImages(files)} onError={onError} />
			</div>
	</div>
	)
}

export default EditProjectImages;