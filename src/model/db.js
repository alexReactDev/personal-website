import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const pool = new pg.Pool({
	user: "postgres",
	password: process.env.DB_PASSWORD,
	host: "localhost",
	port: process.env.DB_PORT,
	database: process.env.DEV === "true" ? "personal_website_mock" : "personal_website"
});

export default pool;