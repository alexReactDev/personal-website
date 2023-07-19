import Image from "next/image";

function Logo() {
	return (
		<div className="max-h-20">
			<Image src="/images/logo/logo.png" width={227} height={80} alt="logo" className="max-h-full" />
		</div>
	)
}

export default Logo;