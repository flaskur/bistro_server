import { Client } from 'pg';

export const client = new Client({
	user: 'flaskur',
	host: 'localhost',
	database: 'bistro',
	password: process.env.DBPASSWORD,
	port: 5432,
});
