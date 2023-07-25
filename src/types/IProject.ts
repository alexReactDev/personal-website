export interface IProject {
	id: number,
	name: string,
	title: string,
	description: string,
	date: string
};

export interface IProjectWithSkills extends IProject {
	skills: string[]
}