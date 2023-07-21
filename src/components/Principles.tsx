import Image from "next/image";

function Principles() {
	return (
		<section className="fullscreen">
		<div className="container">
			<div className="flex flex-col-reverse items-center justify-center gap-3 xm:gap-8 lg:gap-0 lg:flex-row-reverse min-h-screen">
				<div className="xm:w-3/4 lg:w-1/2 flex flex-col justify-center box-border lg:pl-24 text-center lg:text-right">
					<h2 className="title font-accent">
						Development in accordance with best practices
					</h2>
					<p>
						Non et, hic aperiam natus obcaecati, blanditiis maiores voluptates officia minus quibusdam dolore praesentium nam laboriosam earum provident reiciendis dicta explicabo vel itaque ut repellat iure, at, eos repudiandae! Autem. Molestiae sed, ea quam veniam. Totam deleniti voluptatibus quae veritatis officiis blanditiis, temporibus in vel! Minus nesciunt qui optio aut quis alias non beatae. Molestias voluptate expedita consequuntur nisi iusto. Tempora sed deserunt consequuntur, unde.
					</p>
				</div>
				<div className="xm:w-3/4 lg:w-1/2 flex justify-center items-center">
					<Image src="/images/homepage/principles/hero.png" width={500} height={500} alt="programming principles" />
				</div>
			</div>
		</div>
	</section>
	)
}

export default Principles;