interface IProps {
	className?: string,
	aside: React.ReactNode,
	children: React.ReactNode
}

function AsideLayout({ className = "", aside, children }: IProps) {
	return (
		<div className={`${className} lg:flex`}>
			<aside className="mb-2 lg:mb-0 lg:w-1/4">
				{aside}
			</aside>
			<div className="lg:w-3/4 box-border lg:pl-5">
				{children}
			</div>
		</div>
	)
}

export default AsideLayout;