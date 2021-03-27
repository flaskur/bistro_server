import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import database from './database/database';
import registerRouter from './routes/register-router';
import loginRouter from './routes/login-router';
import verifyRouter from './routes/verify-router';
import menuRouter from './routes/menu-router';
import orderRouter from './routes/order-router';
import profileRouter from './routes/profile-router';

dotenv.config();
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use('/register', registerRouter);
server.use('/login', loginRouter);
server.use('/verify', verifyRouter);
server.use('/menu', menuRouter);
server.use('/order', orderRouter);
server.use('/profile', profileRouter);

server.get('/banana', (request, response) => {
	console.log('banana triggered');
	response.json({
		message: 'hello',
	});
});

const startup = async () => {
	await database.connect();

	server.listen(process.env.PORT, () => {
		console.log(`server started on port ${process.env.PORT}`);
	});
};
startup();
