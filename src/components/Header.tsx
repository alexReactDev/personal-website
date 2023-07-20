import MenuContextProvider from "@/providers/menuContextProvider";
import Logo from "./Logo";
import TopNav from "./TopNav";
import Burger from "./Burger";

function Header() { //Put context provider here
	return (
		<header className="fixed h-{128px} w-full bg-grey">
			<MenuContextProvider>
				<div className="container">
					<div className="flex justify-between lg:justify-center items-center py-2">
						<Logo />
						<Burger className="z-10" />
					</div>
				</div>
				<TopNav />
			</MenuContextProvider>
		</header>
	)
}

export default Header;