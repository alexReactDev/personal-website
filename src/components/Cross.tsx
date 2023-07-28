function Cross({ className = "", ...props }) {
	return (
		<div className={`${className} relative w-[15px] h-[15px] hover:bg-gray-100 active:bg-gray-300 active:top-[1px] before:w-full before:h-[1px] before:absolute before:top-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-gray-600 after:w-full after:h-[1px] after:absolute after:top-1/2 after:-translate-y-1/2 after:-rotate-45 after:bg-gray-600 cursor-pointer duration-100`} {...props}></div>
	)
}

export default Cross;