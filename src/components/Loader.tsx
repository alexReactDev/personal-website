import loader from "@/icons/loader.gif";
import Image from "next/image";

function Loader() {
	return (
		<div className="flex justify-center items-center">
			<Image src={loader}	width={250} height={250} alt="loader" className="max-w-full max-h-full" />
		</div>
	)
}

export default Loader;