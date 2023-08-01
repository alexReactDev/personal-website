"use client"

import { useEffect, useState } from "react";
import Cross from "./Cross";

interface IProps {
	className?: string,
	selected: string[],
	onSelect: (skills: string[]) => void
}

function SelectSkills({ className = "", selected, onSelect }: IProps) {
	const [ skills, setSkills ] = useState<string[]>([]);
	const [ editSkills, setEditSkills ] = useState(false);
	const [ selectedSkill, setSelectedSkill ] = useState("");

	useEffect(() => {
		(async () => {
			const data = await (await fetch("/api/skills")).json();

			setSkills(data);
		})();
	}, []);

	return (
		<div className={`${className}`}>
			<ul className="mb-4 pl-5">
				{
					selected.map((skill: string) => {
						return (
							<li key={skill} className="group flex justify-between items-center mb-4 list-disc">
								<p className="relative pl-[15px] before:w-[5px] before:h-[5px] before:bg-black before:rounded-full before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0">
									{skill}
								</p>
								<Cross className="opacity-0 invisible group-[:hover]:opacity-100 group-[:hover]:visible" onClick={() => onSelect(selected.filter((item: string) => item !== skill))} />
							</li>
						)
					})
				}
			</ul>
			<div className="flex flex-col justify-center">
				{
					editSkills &&
					<select
						onChange={(e) => setSelectedSkill(e.target.value)}
						className="block min-w-[300px] border border-solid border-gray-300 px-3 py-1 mb-2"
					>
						{
							skills.map((skill: string) => {
								return (
									<option key={skill} value={skill}>
										{skill}
									</option>
								)
							})
						}
					</select>
				}
				<button 
					type="button"
					className="btn w-1/2 self-center py-2"
					onClick={() => editSkills ? onSelect([...selected, selectedSkill]) : setEditSkills(true)}
				>
					Add
				</button>
			</div>
		</div>
	)
}

export default SelectSkills;