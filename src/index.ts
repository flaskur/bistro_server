import express from 'express';
import { client } from './database';

const server = express();

server.get('/banana', (request, response) => {
	console.log('banana triggered');
	response.json({
		message: 'hello',
	});
});

const startup = async () => {
	console.log(client);
	await client.connect();
	server.listen(3001, () => {
		console.log('server started');
	});

	client.query('SELECT * from customer;', (err, res) => {
		let { email, password } = res.rows[0];
		console.log(email, password);
		client.end();
	});
};
startup();
