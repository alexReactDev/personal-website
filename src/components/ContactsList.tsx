import Image from "next/image";
import Link from "next/link";

import db from "../model/db.js";

async function ContactsList({ className = ""}) {
	const contacts = (await db.query(`SELECT * FROM contacts;`)).rows[0];

	return (
		<div className={`${className} flex`}>
			<ul className="w-1/2">
				<li className="flex mb-4 gap-2 items-center">
					<Image src="/images/icons/phone.png" width={24} height={24} alt="phone icon" />
					<Link href={`tel:${contacts.phone}`}>
						{contacts.phone}
					</Link>
				</li>
				<li className="flex mb-4 gap-2 items-center">
					<Image src="/images/icons/linkedin.png" width={24} height={24} alt="linkedin icon" />
					<Link href={contacts.linkedin}>
						{contacts.linkedin}
					</Link>
				</li>
				<li className="flex mb-4 gap-2 items-center">
					<Image src="/images/icons/skype.png" width={24} height={24} alt="skype icon" />
					<Link href={contacts.skype}>
						{contacts.skype}
					</Link>
				</li>
			</ul>
			<ul className="w-1/2">
				<li className="flex mb-4 gap-2 items-center">
					<Image src="/images/icons/email.png" width={24} height={24} alt="email icon" />
					<Link href={`mailto:${contacts.email}`}>
						{contacts.email}
					</Link>
				</li>
				<li className="flex mb-4 gap-2 items-center">
					<Image src="/images/icons/github.png" width={24} height={24} alt="github icon" />
					<Link href={contacts.github}>
						{contacts.github}
					</Link>
				</li>
				<li className="flex mb-4 gap-2 items-center">
					<Image src="/images/icons/telegram.png" width={24} height={24} alt="messengers icon" />
					<Link href={contacts.messengers}>
						{contacts.messengers}
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default ContactsList;