"use client"

import { Navigation, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from "react";
import ImgWithPortal from "./ImgWIthPortal";

interface IProps {
	className?: string,
	pictures: string[]
}

function ProjectPreview({ className = "", pictures }: IProps) {
	const [ current, setCurrent ] = useState(pictures[0]);

	return (
		<div className={`${className} sm:flex`}>
			<div className="mb-5 sm:mb-0 sm:w-4/5">
				<ImgWithPortal img={current} />
			</div>
			<div className="sm:w-1/5 box-border sm:pl-5 flex sm:flex-col justify-between items-center">
				<div className="w-[25px] h-[80px] sm:w-[80px] sm:h-[20px] flex justify-center items-center bg-gray-700 before:border-solid before:border-b-white before:border-x-transparent before:border-b-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm before:-rotate-90 sm:before:-rotate-0" data-prev></div>
				<Swiper
					modules={[Navigation, Mousewheel]}
					className="max-w-[164px] 2xm:max-w-[248px] xm:max-w-[332px] min-[560px]:max-w-[416px] sm:h-[332px]"
					spaceBetween={4}
					slidesPerView={2}
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
						},
						640: {
							direction: "vertical",
							slidesPerView: 4
						}
					}}
				>
					{
						pictures.map((picture: string) => {
							if(picture.match(/.mp4$/i)) {
								return (
									<SwiperSlide key={picture} onClick={() => setCurrent(picture)}>
										<div className={`group relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-gray-700 before:w-[40px] before:h-[40px] before:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/3 after:border-l-white after:border-solid after:border-l-[12px] after:border-y-transparent after:border-y-[8px] ${picture === current ? "" : "hover:before:w-[36px] hover:before:h-[36px]"}`} data-testid={`project-preview-picture-${picture}`}>
											<video src={picture} width={80} height={80} className={`w-[80px] h-[80px] box-border object-cover object-center border border-solid border-gray-100 shadow-sm ${picture === current ? "border-solid border border-gray-400" : "group-[:hover]:p-[2px] group-[:hover]:border-none"}`}></video>
										</div>
									</SwiperSlide>
								)
							}
							else {
								return (
									<SwiperSlide key={picture} onClick={() => setCurrent(picture)}>
										<img src={picture} width={80} height={80} alt={picture} className={`w-[80px] h-[80px] box-border object-cover object-center border border-solid border-gray-100 shadow-sm ${picture === current ? "border-solid border border-gray-400" : "hover:border-none hover:p-[2px]"}`} data-testid={`project-preview-picture-${picture}`} />
									</SwiperSlide>
								)
							}
						})
					}
				</Swiper>
				<div className="w-[25px] h-[80px] sm:w-[80px] sm:h-[20px] flex justify-center items-center bg-gray-700 before:border-solid before:border-t-white before:border-x-transparent before:border-t-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm before:-rotate-90 sm:before:-rotate-0" data-next></div>
			</div>
		</div>
	)
}

export default ProjectPreview;