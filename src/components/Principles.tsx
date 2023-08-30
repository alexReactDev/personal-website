"use client"
import Image from "next/image";
import { useEffect } from "react";

function Principles() {
	useEffect(() => {
		const intersectionCallback = (e: IntersectionObserverEntry[]) => {
			const animatedLeft = document.querySelector("[data-class='animated-principles-left']")!;
			const animatedRight = document.querySelector("[data-class='animated-principles-right']")!;

			console.log(e);

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

		const target = document.querySelector("[data-class='animated-principles']")!;

		observer.observe(target);

		return () => {
			observer.disconnect();
		}
	}, [])

	return (
		<section className="fullscreen">
		<div className="container">
			<div className="flex flex-col-reverse items-center justify-center gap-3 xm:gap-8 lg:gap-0 lg:flex-row-reverse min-h-screen" data-class="animated-principles">
				<div className="animated-invisible animated-transform-right xm:w-3/4 lg:w-1/2 flex flex-col justify-center box-border lg:pl-24 text-center lg:text-right duration-200" data-class="animated-principles-right">
					<h2 className="title font-accent">
						Development in accordance with best practices
					</h2>
					<p>
						{"I appreciate applying principles and other best practices in code. I dedicated much time to learning and implementing principles like SOLID, GRASP; GOF patterns and other."}
					</p>
				</div>
				<div className="animated-invisible animated-transform-left xm:w-3/4 lg:w-1/2 flex justify-center items-center duration-200" data-class="animated-principles-left">
					<Image src="/images/homepage/principles/hero.png" width={500} height={500} alt="programming principles" />
				</div>
			</div>
		</div>
	</section>
	)
}

export default Principles;