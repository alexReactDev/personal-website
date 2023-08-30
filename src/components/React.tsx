"use client"
import Image from "next/image";
import { useEffect } from "react";

function React() {
	useEffect(() => {
		const intersectionCallback = (e: IntersectionObserverEntry[]) => {
			const animatedLeft = document.querySelector("[data-class='animated-react-left']")!;
			const animatedRight = document.querySelector("[data-class='animated-react-right']")!;

			if(e[0].isIntersecting) {
				animatedLeft.classList.remove("animated-invisible");
				animatedLeft.classList.remove("animated-transform-left");
				animatedRight.classList.remove("animated-invisible");
				animatedRight.classList.remove("animated-transform-right");
			} else {
				animatedLeft.classList.add("animated-invisible");
				animatedLeft.classList.add("animated-transform-left");
				animatedRight.classList.add("animated-invisible");
				animatedRight.classList.add("animated-transform-right");
			}
		}

		const observer = new IntersectionObserver(intersectionCallback, { threshold: 0.75 });

		const target = document.querySelector("[data-class='animated-react']")!;

		observer.observe(target);

		return () => {
			observer.disconnect();
		}
	}, [])

	return (
		<section className="fullscreen">
			<div className="container">
				<div className="flex flex-col-reverse items-center justify-center gap-3 xm:gap-8 lg:gap-0 lg:flex-row min-h-screen" data-class="animated-react">
					<div className="animated-invisible animated-transform-left xm:w-3/4 lg:w-1/2 flex flex-col justify-center box-border lg:pr-24 text-center lg:text-left duration-200" data-class="animated-react-left">
						<h2 className="title font-accent">
							Full spectrum of React technologies
						</h2>
						<p>
							{"I work with latest versions of react and know it’s different features like hooks and suspense. Apart from react itself, I’m also well acquainted with it’s ecosystem. I work with redux, redux toolkit, Next.js, know different ways of styiling react components and use different minor libraries like formik, swr and other."}
						</p>
					</div>
					<div className="animated-invisible animated-transform-right xm:w-3/4 lg:w-1/2 flex justify-center items-center duration-200" data-class="animated-react-right">
						<Image src="/images/homepage/react/hero.png" width={600} height={600} alt="react technologies" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default React;