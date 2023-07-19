import Logo from "./Logo";
import TopNav from "./TopNav";

function Header() { //Put context provider here
	return (
		<header className="fixed h-24 w-full bg-grey">
			<div className="container">
				<div className="flex justify-center py-2">
					<Logo />
				</div>
			</div>
			<TopNav />
		</header>
	)
}

export default Header;