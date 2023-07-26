import Image from "next/image";
import Link from "next/link";

function Logo({ min = false }) {
	return (
		<div>
			<Link href="/">
				{
					min
					?
					<Image src="/images/logo/logo-icon.png" width={90} height={90} alt="logo icon" className="max-h-[90px]" />
					:
					<Image src="/images/logo/logo.png" width={227} height={80} alt="logo" className="max-w-[160px] 2xm:max-w-[180px] xm:max-w-none max-h-[80px]" />
				}
			</Link>
		</div>
	)
}

export default Logo;