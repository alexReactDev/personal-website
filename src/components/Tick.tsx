interface IProps {
	isOpen: boolean,
	onClick?: (...props: any) => any
	className?: string
}

function Tick({ isOpen, onClick, className }: IProps) {
	return (
		<div
			onClick={onClick}
			className={`${className} w-[16px] h-[16px] absolute before:w-1/2 before:h-[1px] before:absolute before:top-1/2 before:left-[1px] before:bg-gray-400 ${isOpen ? "before:-rotate-45" : "before:rotate-45"} after:w-1/2 after:h-[1px] after:absolute after:top-1/2 after:right-[1px] after:bg-gray-400 ${isOpen ? "after:rotate-45" : "after:-rotate-45"}`}
		/>
	)
}

export default Tick;