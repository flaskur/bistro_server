import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import database from './database/database';
import registerRouter from './routes/registerRouter';
import verifyRouter from './routes/verifyRouter';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use('/register', registerRouter);
server.use('/verify', verifyRouter);

server.get('/banana', (request, response) => {
	console.log('banana triggered');
	response.json({
		message: 'hello',
	});
});

const startup = async () => {
	console.log(database);
	await database.connect();
	server.listen(3001, () => {
		console.log('server started');
	});

	// clear database
	await database.query('delete from customer');

	// database.query('SELECT * from customer;', (err, res) => {
	// 	let { email, password } = res.rows[0];
	// 	console.log(email, password);
	// });
};
startup();
