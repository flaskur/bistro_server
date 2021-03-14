import { Client } from 'pg';

const database = new Client({
	user: 'flaskur',
	host: 'localhost',
	database: 'bistro',
	password: process.env.DBPASSWORD,
	port: 5432,
});

export default database;
