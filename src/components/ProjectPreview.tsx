"use client"
import "client-only";

import Image from "next/image";
import { Navigation, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import  ReactDOM  from "react-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from "react";

interface IProps {
	className?: string,
	pictures: string[]
}

function ProjectPreview({ className = "", pictures }: IProps) {
	const [ current, setCurrent ] = useState(pictures[0]);

	const [ displayPortal, setDisplayPortal ] = useState(false);

	const portal = window.document.createElement("div");
	window.document.body.prepend(portal);

	return (
		<>
			{
				displayPortal 
				? 
				ReactDOM.createPortal(
					<div className="fixed w-full h-full flex justify-center items-center z-20 p-12 bg-gray-500/70">
						<div className="absolute w-[20px] h-[20px] right-3 top-3 before:absolute before:w-full before:h-[2px] before:bg-white before:left-0 before:top-1/2 before:rotate-45 after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:top-1/2 after:-rotate-45" onClick={() => setDisplayPortal(false)}></div>
						<img src={current} alt={current} className="max-w-full max-h-full object-contain" />
					</div>,
					portal
				) : ""
			}
			<div className={`${className} flex`}>
				<div className="group relative w-4/5 box-border border border-solid border-gray-100">
					{
						current.match(/.mp4$/i)
						?
						<video controls width={415} height={380} src={current} className="w-full h-[380px] object-cover object-center shadow"></video>
						:
						<>
							<div className="hidden group-[:hover]:block absolute w-full h-full bg-gray-300/20 before:w-[40px] before:h-[40px] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[url(/images/icons/search.png)] before:bg-contain before:bg-center before:bg-no-repeat" onClick={() => setDisplayPortal(true)}></div>
							<Image src={current} width={415} height={380} alt="preview" className="w-full h-[380px] object-cover object-center shadow" />
						</>
					}
				</div>
				<div className="w-1/5 box-border pl-5 flex flex-col justify-between items-center">
					<div className="w-[80px] h-[20px] flex justify-center items-center bg-gray-700 before:border-solid before:border-b-white before:border-x-transparent before:border-b-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm" data-prev></div>
					<Swiper
						modules={[Navigation, Mousewheel]}
						direction="vertical"
						height={80}
						className="h-[332px]"
						spaceBetween={4}
						mousewheel
						navigation={{
							nextEl: "[data-next]",
							prevEl: "[data-prev]"
						}}
					>
						{
							pictures.map((picture: string) => {
								if(picture.match(/.mp4$/i)) {
									return (
										<SwiperSlide key={picture} onClick={() => setCurrent(picture)}>
											<div className={`group relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-gray-700 before:w-[40px] before:h-[40px] before:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/3 after:border-l-white after:border-solid after:border-l-[12px] after:border-y-transparent after:border-y-[8px] ${picture === current ? "" : "hover:before:w-[36px] hover:before:h-[36px]"}`}>
												<video src={picture} width={80} height={80} className={`w-[80px] h-[80px] box-border object-cover object-center border border-solid border-gray-100 shadow-sm ${picture === current ? "border-solid border border-gray-400" : "group-[:hover]:p-[2px] group-[:hover]:border-none"}`}></video>
											</div>
										</SwiperSlide>
									)
								}
								else {
									return (
										<SwiperSlide key={picture} onClick={() => setCurrent(picture)}>
											<Image src={picture} width={80} height={80} alt={picture} className={`w-[80px] h-[80px] box-border object-cover object-center border border-solid border-gray-100 shadow-sm ${picture === current ? "border-solid border border-gray-400" : "hover:border-none hover:p-[2px]"}`} />
										</SwiperSlide>
									)
								}
							})
						}
					</Swiper>
					<div className="w-[80px] h-[20px] flex justify-center items-center bg-gray-700 before:border-solid before:border-t-white before:border-x-transparent before:border-t-[10px] before:border-x-[8px] shadow-sm active:bg-gray-500 active:shadow-none active:relative active:top-[1px] rounded-sm" data-next></div>
				</div>
			</div>
		</>

	)
}

export default ProjectPreview;