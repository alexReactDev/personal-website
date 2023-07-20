import ContactsList from "./ContactsList";
import Logo from "./Logo";

function Footer() {
	return (
		<footer className="footer bg-gray-800 text-white">
			<div className="container">
				<div className="py-5">
					<div className="flex mb-5 justify-between">
						<div className="w-5/6">
							<ContactsList />
						</div>
						<div className="w-1/6 flex justify-center">
							<Logo min />
						</div>
					</div>
					<p className="text-center">
						© 2023 alexreactdev
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer;