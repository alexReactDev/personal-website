"use client"
import Image from "next/image";
import { useEffect } from "react";

function Optimizations() {
	useEffect(() => {
		const animationCallback = (e: IntersectionObserverEntry[]) => {
			const optimizations = document.querySelector("[data-class='animated-optimizations']");
			const design = document.querySelector("[data-class='animated-design']");
			const quality = document.querySelector("[data-class='animated-quality']");

			if(e[0].isIntersecting) {
				optimizations?.classList.remove("animated-invisible");
				optimizations?.classList.remove("animated-transform-left");
				design?.classList.remove("animated-invisible");
				design?.classList.remove("animated-transform-right");
				quality?.classList.remove("animated-invisible");
				quality?.classList.remove("animated-transform-left");
			} else {
				optimizations?.classList.add("animated-invisible");
				optimizations?.classList.add("animated-transform-left");
				design?.classList.add("animated-invisible");
				design?.classList.add("animated-transform-right");
				quality?.classList.add("animated-invisible");
				quality?.classList.add("animated-transform-left");
			}
		}

		const observer = new IntersectionObserver(animationCallback, { threshold: 0.75 });

		const target = document.querySelector("[data-class='animated-list']")!;

		observer.observe(target);

		return () => observer.disconnect();
	}, []);

	return (
		<section className="fullscreen bg-gray-50">
			<div className="container">
				<div className="flex flex-col justify-center min-h-screen">
					<ul className="flex flex-col items-center lg:items-start" data-class="animated-list">
						<li className="animated-invisible animated-transform-left xm:flex justify-center sm:w-3/4 lg:w-1/2 lg:pr-5 mb-6 xm:mb-10 text-center xm:text-start duration-200 delay-0" data-class="animated-optimizations">
							<div className="flex xm:w-1/4 mb-4 xm:mb-0 justify-center items-center">
								<Image src="/images/homepage/misc/1.png" width={100} height={100} alt="gear wheel" />
							</div>
							<div className="xm:w-3/4 xm:pl-3">
								<h3 className="title">
									Optimizations
								</h3>
								<p>
									I know the tricks to make react apps faster, like caching requests (via swr), memoizing calculations (via useMemo) e.t.c. I also know pros and cons of different types of rendering (SSG, SSR, SPA) and when to use each one.
								</p>
							</div>
						</li>
						<li className="animated-invisible animated-transform-right xm:flex lg:flex-row-reverse sm:w-3/4 lg:w-1/2 lg:pl-5 mb-6 xm:mb-10 lg:self-end text-center xm:text-start lg:text-end duration-200 delay-200" data-class="animated-design">
							<div className="flex xm:w-1/4 mb-4 xm:mb-0 justify-center items-center">
								<Image src="/images/homepage/misc/2.png" width={100} height={100} alt="gear wheel" />
							</div>
							<div className="xm:w-3/4 xm:pl-3 lg:pr-3">
								<h3 className="title">
									Adaptive design
								</h3>
								<p>
									I use adaptive-responsive approach, BEM methodology and power of preprocessors like SASS to make sure that my apps look good on any device.
								</p>
							</div>
						</li>
						<li className="animated-invisible animated-transform-left xm:flex sm:w-3/4 lg:w-1/2 lg:pr-5 mb-6 xm:mb-10 text-center xm:text-start duration-200 delay-[400ms]" data-class="animated-quality">
							<div className="flex xm:w-1/4 mb-4 xm:mb-0 justify-center items-center">
								<Image src="/images/homepage/misc/3.png" width={100} height={100} alt="gear wheel" />
							</div>
							<div className="xm:w-3/4 xm:pl-3">
								<h3 className="title">
									Quality
								</h3>
								<p>
									I work with tools like jest and React testing library for unit and integrational testing. I also write all my code via typescript to ensure quality.
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Optimizations;