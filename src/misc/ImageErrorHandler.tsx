"use client"

function errorHandler(e: any) {
	if(e.target.tagName.match(/img/i)) {
		e.target.setAttribute("data-placeholder", true);

		e.target.addEventListener("load", () => {
			e.target.removeAttribute("data-placeholder");
		})
	}
}

function ImageErrorHandler({ children }: { children: React.ReactNode}) {
	return (
		<div className="h-full" onError={errorHandler}>
			{children}
		</div>
	)
}

export default ImageErrorHandler;