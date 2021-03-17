import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import database from './database/database';
import registerRouter from './routes/registerRouter';
import loginRouter from './routes/loginRouter';
import verifyRouter from './routes/verifyRouter';

dotenv.config();
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use('/register', registerRouter);
server.use('/login', loginRouter);
server.use('/verify', verifyRouter);

server.get('/banana', (request, response) => {
	console.log('banana triggered');
	response.json({
		message: 'hello',
	});
});

const startup = async () => {
	await database.connect();
	await database.query('delete from customer');

	server.listen(process.env.PORT, () => {
		console.log(`server started on port ${process.env.PORT}`);
	});
};
startup();
