import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Customer from '../models/customer';

const postRegister = async (request: Request, response: Response) => {
	const { email, password, firstName } = request.body;
	console.log(email, password, firstName);

	const customer = new Customer(email, password);
	customer.firstName = firstName;
	const result = await customer.save(); // might fail, should res json on result === false
	console.log(`result returned is ${result}`);
	if (!result) {
		return response.json({
			message: 'failed to save for post register',
			error: true,
		});
	}

	console.log('checking if match');
	console.log(bcrypt.compareSync(password, customer.password));

	// actually should be on login route
	const token = jwt.sign({ email: customer.email }, 'secret');

	// send a verification email on register
	// the link should trigger a get request and have the token attached to url --> make verify email route

	return response.json({
		message: 'received post register',
		error: false,
		token,
	});
};

const registerController = {
	postRegister,
};

export default registerController;
