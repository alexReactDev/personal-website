import Image from "next/image";

function Backend() {
	return (
		<section className="fullscreen">
			<div className="container">
				<div className="flex flex-col-reverse items-center justify-center gap-3 xm:gap-8 lg:gap-0 lg:flex-row min-h-screen">
					<div className="xm:w-3/4 lg:w-1/2 flex flex-col justify-center box-border lg:pr-24 text-center lg:text-left">
						<h2 className="title font-accent">
							I know what happens behind the scenes
						</h2>
						<p>
							{"Apart from fronted, I also have experience with some backend technologies. I make REST API’s via Node.js/Express and work with relational databases like PostgreSQL. I also use different tools like webpack, vite, gulp, git and other."}
						</p>
					</div>
					<div className="xm:w-3/4 lg:w-1/2 flex justify-center items-center">
						<Image src="/images/homepage/backend/hero.png" width={600} height={600} alt="backend technologies" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Backend;