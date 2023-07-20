import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
	return (
		<Layout>
			<div className="container">
				<div className="py-5 text-center">
					<Image src="/images/404/404.jpg" width={320} height={400} alt="White surprised creature" className="mx-auto" />
					<h1 className="my-4 font-bold text-2xl">
						Page not found
					</h1>
					<Link href="/" className="text-blue-600 underline active:relative active:top-sl active:text-purple-700">
						Home
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export default NotFound;