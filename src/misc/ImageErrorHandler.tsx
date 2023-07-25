"use client"

function errorHandler(e: any) {
	if(e.target.tagName.match(/img/i)) {
		const placeholder = document.createElement("img");
		placeholder.src = "/images/icons/placeholder.png";

		e.target.replaceWith(placeholder);
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