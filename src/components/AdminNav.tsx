"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Burger from "./Burger";

function AdminNav() {
	const [ isOpen, setIsOpen ] = useState(false);

	useEffect(() => {
		const resizeHandler = () => {
			if(window.innerWidth >= 1024) {
				if(!isOpen) setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		}

		resizeHandler();

		window.addEventListener("resize", resizeHandler);

		return () => window.removeEventListener("resize", resizeHandler);
	}, [])

	return (
		<nav className={`fixed top-[80px] 2xm:top-[100px] lg:!top-[132px] left-0 w-full h-[40px] lg:h-[32px] bg-blue-300 text-white font-bold uppercase z-20`}>
			<div className="container h-full flex justify-center items-center lg:block">
				<div className={`absolute top-[40px] left-0 w-full lg:static ${!isOpen ? "opacity-0 invisible" : ""} max-h-[180px] overflow-y-auto horizontal-sm:max-h-none`}>
					<ul className="flex flex-col py-3 gap-3 lg:h-[32px] lg:py-0 lg:gap-0 text-xl lg:text-base lg:flex-row justify-between items-center bg-blue-300">
						<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
							<Link href="/admin">
								Home
							</Link>
						</li>
						<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
							<Link href="/admin/skills">
								Skills
							</Link>
						</li>
						<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
							<Link href="/admin/projects">
								Projects
							</Link>
						</li>
						<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
							<Link href="/admin/about">
								About
							</Link>
						</li>
						<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
							<Link href="/admin/contacts">
								Contacts
							</Link>
						</li>
					</ul>
				</div>
				<Burger isOpen={isOpen} switcher={() => {setIsOpen(!isOpen)}} />
			</div>
		</nav>
	)
}

export default AdminNav;