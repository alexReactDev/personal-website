import Link from "next/link"

interface IProps {
	className?: string,
	href: string,
	text: string,
	white?: boolean
}

function BtnLink({ className = "", href, text, white = false} : IProps) {
	return (
		<Link href={href} className={`${className} ${white && "text-white border-white"} inline-flex justify-center font-bold border-solid border-2 py-3 px-8 uppercase shadow-md active:translate-y-[2px]`}>
			{text}
		</Link>
	)
}

export default BtnLink;