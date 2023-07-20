'use client'

import { MenuContext } from "@/providers/menuContextProvider";
import { useContext } from "react";

function Burger({ className = "" }) {
	const { isOpen, switcher } = useContext<any>(MenuContext);

	return (
		<div 
			className={`${className} ${isOpen && "before:rotate-45 after:-rotate-45 before:top-[calc(50%-1px)] after:top-[calc(50%-1px)]"} lg:hidden relative w-8 h-6 before:w-full after:w-full before:h-[2px] after:h-[2px] before:absolute after:absolute before:left-0 after:left-0 before:top-0 after:bottom-0 before:bg-white after:bg-white cursor-pointer before:duration-300 after:duration-300`}
			onClick={switcher}
		>
			<div className={`${isOpen && "hidden"} absolute w-full h-[2px] left-0 top-[calc(50%-1px)] bg-white`} />
		</div>
	)
}

export default Burger;