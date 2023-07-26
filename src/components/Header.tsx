import MenuContextProvider from "@/providers/menuContextProvider";
import Logo from "./Logo";
import TopNav from "./TopNav";
import Burger from "./Burger";

function Header() {
	return (
		<header className="fixed w-full bg-grey z-10">
			<MenuContextProvider>
				<div className="container">
					<div className="h-[80px] 2xm:h-[100px] flex justify-between lg:justify-center items-center py-2">
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