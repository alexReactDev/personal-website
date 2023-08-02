"use client"

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import Image from "next/image";
import ImgWithCross from "./ImageWithCross";

import 'swiper/css';
import 'swiper/css/navigation';
import axios from "axios";
import { ImgData } from "@/types/IImgData";
import useCustomSWR from "@/hooks/useCustomSWR";

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

	const previewRef = useRef<HTMLInputElement>(null);
	const imagesRef = useRef<HTMLInputElement>(null);

	const { data: pictures = [], mutate } = useCustomSWR(`/api/projects/images/${projectId}`);

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

	function handlePreviewFile() {
		if(!previewRef.current) return;

		const file = previewRef.current.files![0];

		if(!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			setUploadPreview({
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

	function handleImageFiles() {
		if(!imagesRef.current) return;

		const files = imagesRef.current.files!;

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

		setUploadImages(images);
	}

	return (
		<div className={`${className}`}>
			<div className="mb-2">
				{
					noImage
					?
					<Image src="/images/icons/placeholder.png" width={415} height={380} alt="placeholder" className="w-full h-[240px] 2xm:h-[290px] xm:h-[380px] object-center object-cover" />
					:
					<div onError={(e: any) => e.target.tagName === "IMG" && setNoImage(true)}>
						<ImgWithCross 
							img={`/images/projects/${projectId}/preview.png`} 
							width={415} 
							height={380} 
							alt="preview"
							className="w-full h-[240px] 2xm:h-[290px] xm:h-[380px]" 
							onClick={deleteImage}
						/>
					</div>

				}
			</div>
			<div className="mb-6">
					<input
						type="file"
						accept=".png"
						ref={previewRef}
						onChange={handlePreviewFile}
					/>
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
					<input
						type="file"
						accept=".png,.jpg,.gif,.mp4"
						multiple
						id="picture_files"
						ref={imagesRef}
						onChange={handleImageFiles}
					/>
			</div>
	</div>
	)
}

export default EditProjectImages;