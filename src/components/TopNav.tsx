'use client'

import { MenuContext } from "@/providers/menuContextProvider";
import Link from "next/link";
import { useContext } from "react";

function TopNav() {
	const { isOpen } = useContext<any>(MenuContext);

	return (
		<nav className={`${isOpen || "-translate-y-full"} lg:translate-y-0 fixed top-0 left-0 w-full h-full bg-cyan-500/95 overflow-y-auto lg:overflow-y-hidden lg:static lg:bg-react text-white font-bold uppercase transition-transform duration-300`}>
			<div className="container h-full">
				<ul className="flex-col h-full justify-evenly text-2xl lg:text-base lg:flex-row lg:h-8 flex lg:justify-between items-center">
					<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
						<Link href="/">
							Home
						</Link>
					</li>
					<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
						<Link href="/skills">
							Skills
						</Link>
					</li>
					<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
						<Link href="/projects">
							Projects
						</Link>
					</li>
					<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
						<Link href="/about">
							About
						</Link>
					</li>
					<li className="hover:text-gray-100 active:relative active:top-sl active:underline">
						<Link href="/contacts">
							Contacts
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default TopNav;