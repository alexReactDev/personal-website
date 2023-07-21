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
							Non et, hic aperiam natus obcaecati, blanditiis maiores voluptates officia minus quibusdam dolore praesentium nam laboriosam earum provident reiciendis dicta explicabo vel itaque ut repellat iure, at, eos repudiandae! Autem. Molestiae sed, ea quam veniam. Totam deleniti voluptatibus quae veritatis officiis blanditiis, temporibus in vel! Minus nesciunt qui optio aut quis alias non beatae. Molestias voluptate expedita consequuntur nisi iusto. Tempora sed deserunt consequuntur, unde.
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