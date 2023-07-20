import Link from "next/link";

function TopNav() {
	return (
		<nav className="bg-react text-white font-bold uppercase">
			<div className="container">
				<ul className="h-8 flex justify-between items-center">
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