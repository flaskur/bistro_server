import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { client } from './database';
import registerRouter from './routes/registerRouter';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use('/register', registerRouter);

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
