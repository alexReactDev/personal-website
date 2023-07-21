create TABLE projects (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	title VARCHAR,
	description VARCHAR,
	date VARCHAR
);

create TABLE skills (
	name VARCHAR PRIMARY KEY
);

create TABLE scopes (
	name VARCHAR PRIMARY KEY
);

create TABLE projects_skills (
	id SERIAL PRIMARY KEY,
	project_id INTEGER,
	skill VARCHAR,
	FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
	FOREIGN KEY (skill) REFERENCES skills(name) ON DELETE CASCADE
);

create TABLE skills_scopes (
	id SERIAL PRIMARY KEY,
	skill VARCHAR,
	scope VARCHAR,
	FOREIGN KEY (skill) REFERENCES skills(name) ON DELETE CASCADE,
	FOREIGN KEY (scope) REFERENCES scopes(name) ON DELETE CASCADE
);

create TABLE showcase (
	project_id INTEGER PRIMARY KEY,
	FOREIGN KEY (project_id) REFERENCES projects(id)
);

create TABLE contacts (
	id SERIAL PRIMARY KEY,
	phone VARCHAR,
	email VARCHAR,
	github VARCHAR,
	linkedin VARCHAR,
	skype VARCHAR,
	messengers VARCHAR	
);

create TABLE projects_images (
	id SERIAL PRIMARY KEY,
	project_id INTEGER,
	img VARCHAR,
	FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

create TABLE about(
	id SERIAL PRIMARY KEY,
	text VARCHAR
);