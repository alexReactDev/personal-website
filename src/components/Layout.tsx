import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode}) {
	return (
		<>
			<Header />
			<div className="wrapper">
				<main className="main">
					{children}
				</main>
				<Footer />
			</div>
		</>
	)
}

export default Layout;