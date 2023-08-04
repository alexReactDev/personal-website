import Cross from "./Cross";

interface IProps {
	className?: string,
	items: string[],
	onDelete: (item: string) => void
}

function DeleteItem({ className = "", items, onDelete }: IProps) {
	return (
		<ul className={`${className} flex flex-col items-center lg:block card py-4 px-2`}>
		{
			items.map((item) => {
				return (
					<li key={item} className="group w-56 lg:w-auto flex items-center mb-4 last:mb-0">
						<div className="w-2/3 lg:w-4/5">
							<p>
								{item}
							</p>
						</div>
						<div className="w-1/3 lg:w-1/5 flex justify-center items-center">
							<Cross className="lg:opacity-0 lg:invisible group-[:hover]:opacity-100 group-[:hover]:visible" onClick={() => onDelete(item)} data-testid={`remove-item-${item}`} />
						</div>
					</li>
				)
			})
		}
	</ul>
	)
}

export default DeleteItem;