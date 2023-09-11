/*For e2e tests*/
INSERT INTO projects (id, name, title, description, date, link, repo, preview) values (1, 'Nice page', 'Lorem ipsum dolor', 'Sit amet asquatem', '2021', 'http://google.com', 'http://github.com', 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test.jpg');
INSERT INTO projects (id, name, title, description, date, link, repo, preview) values (2, 'Backend app', 'Lorem ipsum dolor', 'Sit amet asquatem', '2022', 'http://google.com', 'http://github.com', 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test.jpg');
INSERT INTO projects (id, name, title, description, date, link, repo, preview) values (3, 'Something IT-like', 'Lorem ipsum dolor', 'Sit amet asquatem', '2023', 'http://google.com', 'http://github.com', 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test.jpg');

INSERT INTO projects_images (project_id, img) values (1, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test.jpg');
INSERT INTO projects_images (project_id, img) values (1, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test2.jpg');
INSERT INTO projects_images (project_id, img) values (1, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test3.jpg');

INSERT INTO projects_images (project_id, img) values (2, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test.jpg');
INSERT INTO projects_images (project_id, img) values (2, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test2.jpg');
INSERT INTO projects_images (project_id, img) values (2, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test3.jpg');

INSERT INTO projects_images (project_id, img) values (3, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test.jpg');
INSERT INTO projects_images (project_id, img) values (3, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test2.jpg');
INSERT INTO projects_images (project_id, img) values (3, 'https://alexander-portfolio-and-cv.s3.eu-central-1.amazonaws.com/test3.jpg');

INSERT INTO skills (name) values ('javascript');
INSERT INTO skills (name) values ('html');
INSERT INTO skills (name) values ('css');
INSERT INTO skills (name) values ('node.js');

INSERT INTO scopes (name) values ('frontend');
INSERT INTO scopes (name) values ('backend');
INSERT INTO scopes (name) values ('other');

INSERT INTO projects_skills (project_id, skill) values (1, 'javascript');
INSERT INTO projects_skills (project_id, skill) values (2, 'html');
INSERT INTO projects_skills (project_id, skill) values (2, 'css');
INSERT INTO projects_skills (project_id, skill) values (3, 'node.js');

INSERT INTO contacts (phone, email, github, linkedin, skype, messengers) values ('+1 234 567', 'example@gmail.com', '', '', '', '');