import ContactsList from "@/components/ContactsList";

function Contacts() {
	return (
		<div className="container">
			<section className="py-5">
				<h1 className="title">
					Contacts
				</h1>
				<ContactsList className="flex card p-3" />
			</section>
		</div>
	)
}

export default Contacts;