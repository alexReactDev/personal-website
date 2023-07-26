"use client"
import "client-only";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IProps {
	className?: string,
	img: string
}

let portal: HTMLDivElement;

function ImgWithPortal({ className = "", img }: IProps) {
	const [ displayPortal, setDisplayPortal ] = useState(false);


	useEffect(() => {
		portal = window.document.createElement("div");
		window.document.body.prepend(portal);

		return () => {portal.remove()};
	}, [])

	return (
		<>
			{
				displayPortal && portal
				? 
				ReactDOM.createPortal(
					<div className="fixed w-full h-full flex justify-center items-center z-20 p-8 2xm:p-12 bg-gray-500/70">
						<div className="absolute w-[20px] h-[20px] right-3 top-3 before:absolute before:w-full before:h-[2px] before:bg-white before:left-0 before:top-1/2 before:rotate-45 after:absolute after:w-full after:h-[2px] after:bg-white after:left-0 after:top-1/2 after:-rotate-45" onClick={() => setDisplayPortal(false)}></div>
						<img src={img} alt={img} className="max-w-full max-h-full object-contain" />
					</div>,
					portal
				) : ""
			}
			<div className={`${className} border border-solid border-gray-100 shadow`}>
				{
					img.match(/.mp4$/i)
					?
					<video controls width={415} height={380} src={img} className="w-full h-[240px] 2xm:h-[290px] xm:h-[380px] object-cover object-center"></video>
					:
					<div className="group relative cursor-pointer" onClick={() => setDisplayPortal(true)}>
						<div className="hidden group-[:hover]:block absolute w-full h-full bg-gray-300/20 before:w-[40px] before:h-[40px] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[url(/images/icons/search.png)] before:bg-contain before:bg-center before:bg-no-repeat"></div>
						<Image src={img} width={415} height={380} alt="preview" className="w-full h-[240px] 2xm:h-[290px] xm:h-[380px] object-cover object-center" />
					</div>
				}
			</div>
		</>
	)
}

export default ImgWithPortal;