'use client'

import Layout from "@/components/Layout";
import Image from "next/image";

function Error({
	error,
	reset,
  }: {
	error: Error & { digest?: string }
	reset: () => void
  }) {

	console.log(error);

	return (
		<html>
			<body>
				<Layout>
					<div className="container">
						<div className="py-5 text-center">
							<Image src="/images/error/error.jpg" width={320} height={400} alt="Alarmed white creature" className="mx-auto" />
							<h1 className="my-4 font-bold text-2xl">
								Unhandled error. Well... nothing is perfect
							</h1>
							<button onClick={() => reset()} className="text-blue-600 underline active:relative active:top-sl active:text-purple-700">
								Try again
							</button>
						</div>
					</div>
				</Layout>
			</body>
		</html>
	)
}

export default Error;