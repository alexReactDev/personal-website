interface IProps {
	className?: string,
	items: string[],
	selectedItems: string[],
	setSelectedItems: (selectedItems: string[]) => void
}

function Select({ className = "", items, selectedItems, setSelectedItems }: IProps) {
	function selectHandler(item: string) {
		if(selectedItems.includes(item)) {
			setSelectedItems(selectedItems.filter((selectedItem: string) => selectedItem !== item))
		}
		else {
			setSelectedItems([item, ...selectedItems]);
		}
	}

	return (
		<ul className={`${className} flex flex-col items-center lg:block card py-4 px-2`}>
			{
				items.map((item) => {
					return (
						<li key={item} className="w-80 lg:w-auto flex mb-2 last:mb-0 cursor-pointer" onClick={() => selectHandler(item)}>
							<div className="w-1/3 lg:w-1/5 flex justify-center items-center">
								<input 
									type="checkbox" 
									checked={selectedItems.includes(item)} 
								></input>
							</div>
							<div className="w-2/3 lg:w-4/5">
								<p>
									{item}
								</p>
							</div>
						</li>
					)
				})
			}
		</ul>
	)
}

export default Select;