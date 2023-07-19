import dotenv from "dotenv";
dotenv.config();

import _ from "lodash";
import pg from "pg";

const db = new pg.Pool({
	user: "postgres",
	password: process.env.DB_PASSWORD,
	host: "localhost",
	port: 5432,
	database: "personal_website"
});

const scopes = {
	frontend: [
		"Javascript ES6+",
		"Axios",
		"SCSS",
		"BEM",
		"Adaptive, responsive design",
		"Tailwind"
	],
	backend: [
		"Next.js",
		"Node.js/npm",
		"Express",
		"PostgreSQL",
		"JWT",
		"REST api",
		"Cookie, OAuth authorization"
	],
	react: [
		"React 18",
		"React Server components",
		"React suspense",
		"Redux/Redux toolkit",
		"Redux thunk",
		"React-router/Connected-react-router",
		"React hooks",
		"Next.js",
		"SWR",
		"Formik",
		"React-slick"
	],
	other: [
		"Jest",
		"React testing library",
		"Typescript",
		"Linux, windows console",
		"Git/Github",
		"Postman",
		"Docker"
	]
};

const contacts = {
	phone: '+7 705 872 88 32',
	email: 'alexander.work.mailbox@gmail.com',
	github: 'https://github.com/alexReactDev',
	linkedin: 'https://www.linkedin.com/in/alexreactdev/',
	skype: 'https://join.skype.com/invite/Ex9xrSDwfFbM',
	messengers: '+7 924 628 48 16 (Telegram, Whatsapp)'
};

const descriptions = [
	"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit sint atque dolorum fuga adincidunt voluptatum error fugiat animi amet! Odio temporibus nulla id unde quaerat dignissimos enim nisirem provident molestias sit tempore omnis recusandae esse sequi officia sapiente.",
	`Fish are aquatic, craniate, gill-bearing animals that 
	lack limbs with digits. Included in this definition are 
	the living hagfish, lampreys, and cartilaginous and bony 
	fish as well as various extinct related groups. 
	Approximately 95% of living fish species are ray-finned 
	fish, belonging to the class Actinopterygii, with around 
	99% of those being teleosts.`,
	`Fish are aquatic, craniate, gill-bearing animals that 
	lack limbs with digits. Included in this definition are 
	the living hagfish, lampreys, and cartilaginous and bony 
	fish as well as various extinct related groups. 
	Approximately 95% of living fish species are ray-finned 
	fish, belonging to the class Actinopterygii, with around 
	99% of those being teleosts.`
];

const titles = [
	`Obcaecati eaque temporibus aperiam aut natus rerum.`,
	`Cupiditate omnis similique magnam libero eligendi, nobis at minima quas dignissimos ipsum, vitae, explicabo, quibusdam hic.`,
	`Omnis assumenda sapiente praesentium doloribus earum laboriosam, temporibus`

];

const names = ["Aggregator", "Freestyle page", "Nice landing", "Online shop", "Useful service", "Mega homepage"];

const years = ["2021", "2022", "2023"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Random {
	async createSkillsAndScopes() {
		for (let key in scopes) {
			await db.query(`INSERT INTO scopes (name) values $1;`, [key]);

			for (let i = 0; i < scopes[key].length; i++) {
				await db.query(`INSERT INTO skills (name) values $1;`, [scopes[key][i]]);
				await db.query(`INSERT INTO skills_scopes (skill, scope) values $1, $2;`, [scopes[key][i], scopes[key]]);
			}
		}
	}

	async createContacts() {
		await db.query(`INSERT INTO contacts (phone, email, github, linkedin, skype, messengers) values ($1, $2, $3, $4, $5, $6);`, [contacts.phone, contacts.email, contacts.github, contacts.linkedin, contacts.skype, contacts.messengers]);
	}

	async createProjectsAndImages(limit = 10) {
		for (let i = 0; i < limit; i++) {
			const name = names[_.random(0, names.length - 1)];
			const title = titles[_.random(0, titles.length - 1)];
			const description = descriptions[_.random(0, descriptions.length - 1)];
			const date = `${years[_.random(0, years.length - 1)]} ${months[_.random(0, months.length - 1)]} - ${years[_.random(0, years.length - 1)]} ${months[_.random(0, months.length - 1)]}`;

			const projectID = (await db.query(`INSERT INTO projects (name, title, description, date) values $1, $2, $3, $4 RETURNING *;`, [name, title, description, date])).rows[0].id;

			for(let j = 1; j < 5; j++) {
				await db.query(`INSERT INTO projects_images (project_id, img) values $1, $2;`, [projectID, `/images/projects/${projectID}/${j}.png`]);
			}

			await db.query(`INSERT INTO projects_images (project_id, img) values $1, $2;`, [projectID, `/images/projects/${projectID}/1.mp4`]);
		}
	}

	async addSkillsToProjects() {
		const projects = (await db.query(`SELECT * FROM projects;`)).rows;
		const skills = (await db.query(`SELECT * FROM skills;`)).rows;

		for (let i = 0; i < projects.length; i++) {
			for (let j = 0; j < _.random(5, skills.length); j++) {
				await db.query(`INSERT INTO projects_skills (project_id, skill) values $1, $2;`, [projects[i].id, skills[j].name]);
			}
		}
	}
}

const random = new Random();
//random.createSkillsAndScopes();
//random.createProjectsAndImages();
//random.addSkillsToProjects();
random.createContacts();