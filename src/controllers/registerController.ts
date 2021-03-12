import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import database from '../database';

const postRegister = async (request: Request, response: Response) => {
	const { email, password } = request.body;
	console.log(email, password);

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const text = 'insert into customer(email, password) values($1, $2)';
	const values = [
		email,
		hash,
	];
	const _result = await database.query(text, values);

	console.log('checking if match');
	console.log(bcrypt.compareSync(password, hash));

	const token = jwt.sign({ email }, 'secret');

	response.json({
		message: 'received post register',
		token,
	});
};

const registerController = {
	postRegister,
};

export default registerController;
