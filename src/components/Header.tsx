"use client"

import MenuContextProvider from "@/providers/menuContextProvider";
import Logo from "./Logo";
import TopNav from "./TopNav";
import Burger from "./Burger";
import { useState } from "react";

function Header() {
	const [ isOpen, setIsOpen ] = useState(false);

	function switcher() {
		if(window.innerWidth >= 1024) return;
		setIsOpen(!isOpen);
		document.body.classList.toggle("lock");
	}

	return (
		<header className="fixed w-full bg-grey z-[15]">
			<MenuContextProvider>
				<div className="container">
					<div className="h-[80px] 2xm:h-[100px] flex justify-between lg:justify-center items-center py-2">
						<Logo />
						<Burger className="z-10" isOpen={isOpen} switcher={switcher} />
					</div>
				</div>
				<TopNav isOpen={isOpen} switcher={switcher} />
			</MenuContextProvider>
		</header>
	)
}

export default Header;