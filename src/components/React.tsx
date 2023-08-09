import Image from "next/image";

function React() {
	return (
		<section className="fullscreen">
			<div className="container">
				<div className="flex flex-col-reverse items-center justify-center gap-3 xm:gap-8 lg:gap-0 lg:flex-row min-h-screen">
					<div className="xm:w-3/4 lg:w-1/2 flex flex-col justify-center box-border lg:pr-24 text-center lg:text-left">
						<h2 className="title font-accent">
							Full spectrum of React technologies
						</h2>
						<p>
							{"I work with latest versions of react and know it’s different features like hooks and suspense. Apart from react itself, I’m also well acquainted with it’s ecosystem. I work with redux, redux toolkit, Next.js, know different ways of styiling react components and use different minor libraries like formik, swr and other."}
						</p>
					</div>
					<div className="xm:w-3/4 lg:w-1/2 flex justify-center items-center">
						<Image src="/images/homepage/react/hero.png" width={600} height={600} alt="react technologies" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default React;