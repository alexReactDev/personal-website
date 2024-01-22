import ScrollDown from "./ScrollDown";

function Fullscreen() {
	return (
		<section className="flex fullscreen -mt-[80px] pt-[80px] 2xm:-mt[100px] 2xm:pt-[100px] lg:-mt-[128px] lg:pt-[128px] bg-[url('/images/homepage/main.jpg')] bg-center bg-cover bg-no-repeat text-white">
			<div className="flex flex-col container">
				<div className="grow flex flex-col justify-center items-center text-center font-medium">
					<h1 className="text-4xl xm:text-6xl sm:text-8xl mb-8" data-testid="main-title">
						Hi. My name is Alexander.
					</h1>
					<h2 className="mb-10 text-2xl xm:text-3xl sm:text-4xl">
						{"I'm frontend developer"}
					</h2>
					<ScrollDown />
				</div>
			</div>
		</section>
	)
}

export default Fullscreen;