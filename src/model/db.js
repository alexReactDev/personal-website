import pg from "pg";

const pool = new pg.Pool({
	user: "postgres",
	password: process.env.DB_PASSWORD,
	host: "localhost",
	port: 5432,
	database: "personal_website"
});

export default pool;