import Image from "next/image";
import Link from "next/link";

function Logo({ min = false }) {
	return (
		<div>
			<Link href="/">
				{
					min
					?
					<Image src="/images/logo/logo-icon.png" width={90} height={90} alt="logo icon" className="max-h-[100px]" />
					:
					<Image src="/images/logo/logo.png" width={227} height={80} alt="logo" className="max-h-20" />
				}
			</Link>
		</div>
	)
}

export default Logo;