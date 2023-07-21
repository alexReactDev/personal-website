import BtnLink from "./BtnLink";

function ContactMe() {
	return (
		<div className="h-48 flex justify-center items-center bg-[url(/images/homepage/contact/bg.jpg)] bg-center bg-cover bg-no-repeat">
			<BtnLink href="/contacts" text="Contact me" white />
		</div>
	)
}

export default ContactMe;