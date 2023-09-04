"use client"

import { MouseEvent as ReactMouseEvent, PropsWithChildren, useEffect, useState } from "react"
import Tick from "./Tick";
import tickIcon from "../icons/tick.png";
import Image from "next/image";

interface IOption<T> {
	value: T,
	name: string
}

interface IProps<T> {
	options: IOption<T>[],
	value:  T[],
	onChange: (value: T[]) => void
	placeholder?: string
}

function CustomMultipleSelect<X extends string | number>({ options, value, onChange, placeholder = ""}: PropsWithChildren<IProps<X>>) {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ lastSelectedValue, setLastSelectedValue ] = useState<X | null>(null);

	useEffect(() => {
		const clickawayListener = (e: MouseEvent) => {
			if(!(e.target as HTMLElement).closest("[data-multiple-select-clickaway]")) setIsOpen(false);
		}

		window.addEventListener("click", clickawayListener);

		return () => window.removeEventListener("click", clickawayListener);
	}, []);

	const title = options.filter((option) => value.includes(option.value)).map((option) => option.name).join(", ");

	function optionClickHandler(selected: X) {
		if(value.includes(selected)) {
			onChange(value.filter((val) => val != selected));
			setLastSelectedValue(null);
		} else {
			onChange([selected, ...value]);
			setLastSelectedValue(selected);
		}
	}

	function optionShiftClickHandler(selected: X) {
		if(!lastSelectedValue) return optionClickHandler(selected);

		const values = options.map((option) => option.value);

		const start = Math.min(values.indexOf(lastSelectedValue), values.indexOf(selected));
		const end = Math.max(values.indexOf(lastSelectedValue), values.indexOf(selected));

		onChange(values.slice(start, end + 1));
	}

	function menuClickHandler(e: ReactMouseEvent) {
		if(!(e.target as HTMLElement).closest("[data-multiple-select-menu]")) setIsOpen(!isOpen);
	}

	return (
		<div className="inline-block relative box-border min-w-[300px] h-[40px] border border-solid border-gray-300 px-3 py-2 select-none" data-multiple-select-clickaway onClick={menuClickHandler}>
			<Tick isOpen={isOpen}  className="absolute right-1 top-1/2 -translate-y-1/2" />
			<p>
				{
					title && title.length > 35
					?
					title.slice(0, 33) + "..."
					:
					title
				}
				{
					!title &&
					<p className="text-gray-300">
						{placeholder}
					</p>
				}
			</p>
			<div className={`${isOpen ? "" : "hidden"} absolute box-border top-[40px] left-0 w-full border border-solid border-gray-200 p-2 bg-white z-10`} data-multiple-select-menu>
				<ul>
					{
						options.map((option) => {
							const selected = value.includes(option.value);

							return (
								<li key={option.value} className={`${selected ? "bg-gray-200" : ""} relative py-1 last:mb-0`} onClick={(e) => e.shiftKey ? optionShiftClickHandler(option.value) : optionClickHandler(option.value)}>
									<Image width={18} height={18} src={tickIcon} alt="selected" className={`${selected ? "" : "hidden"} w-[18px] h-[18px] absolute top-1/2 -translate-y-1/2 right-2`} />
									{option.name}
								</li>
							)
						})
					}
				</ul>
			</div>
		</div>
	)
}

export default CustomMultipleSelect;