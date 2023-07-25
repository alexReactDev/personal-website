"use client"

import { useState } from "react";

interface IProps {
	className?: string,
	initialOpen?: boolean,
	children: React.ReactNode,
	title?: string
}

function Spoiler({ className = "", initialOpen = true, children, title = "" }: IProps) {
	const [ isOpen, setIsOpen ] = useState(initialOpen);

	return (
		<div className={`${className}`}>
			<div 
				className={`h-8 box-border pl-14 flex items-center relative card text-gray-600 before:absolute before:h-[2px] before:w-4 before:left-[15px] before:top-1/2 before:-translate-y-1/2 before:bg-gray-500 after:absolute after:h-[2px] after:w-4 after:left-[26px] after:top-1/2 after:-translate-y-1/2 after:bg-gray-500 ${isOpen ? "before:-rotate-45 after:rotate-45": "before:rotate-45 after:-rotate-45"}`}
				onClick={() => setIsOpen(!isOpen)}
			></div>
			<div className={`${isOpen ? "max-h-full" : "max-h-0"} overflow-hidden`}>
				{children}
			</div>
		</div>
	)
}

export default Spoiler;