export interface IProject {
	id: number,
	name: string,
	title: string,
	description: string,
	date: string,
	preview: string
};

export interface IProjectWithSkills extends IProject {
	skills: string[]
}