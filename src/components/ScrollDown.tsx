'use client'
import "client-only";

function ScrollDown() {
	function scroll() {
		window.scrollTo(0, window.innerHeight);
	}

	return (
		<div 
			className="relative w-12 h-12 border-white border-solid border-2 rounded-full before:absolute after:absolute before:w-4 after:w-4 before:h-[2px] after:h-[2px] before:bg-white after:bg-white before:top-1/2 after:top-1/2 before:left-[calc(50%-5px)] after:left-[calc(50%+5px)] before:-translate-x-1/2 after:-translate-x-1/2 before:rotate-45 after:-rotate-45 hover:-translate-y-1 active:-translate-y-0 duration-100 transition-transform"
			onClick={scroll}
		>
		</div>
	)
}

export default ScrollDown;