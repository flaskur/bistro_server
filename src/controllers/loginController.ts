import { Request, Response } from 'express';
import database from '../database/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const postLogin = async (request: Request, response: Response) => {
	const { email, password } = request.body;

	const text = `
		select customer.id, customer.email, customer.password, customer.verified from customer
		where customer.email = $1;
	`;
	const values = [
		email,
	];
	const result = await database.query(text, values);

	// ** validate that the customer has verified their email

	// VALIDATE CUSTOMER EXISTS
	if (!result.rows.length) {
		return response.json({
			success: false,
			message: 'CUSTOMER DOES NOT EXIST',
		});
	}

	// VALIDATE CORRECT PASSWORD
	const dbPassword = result.rows[0].password;
	const isValidPassword = await bcrypt.compare(password, dbPassword);
	if (!isValidPassword) {
		return response.json({
			success: false,
			message: 'PASSWORD IS INCORRECT',
		});
	}

	// SEND BACK A JWT FOR FRONT END SESSION AUTH
	const token = jwt.sign(
		{
			id: result.rows[0].id,
			email,
		},
		process.env.JWT_KEY!, // technically possible to not exist if env not defined
		{
			expiresIn: '7d',
		},
	);

	return response.json({
		success: true,
		message: 'SUCCESSFUL CUSTOMER LOGIN',
		token,
	});
};

const loginController = {
	postLogin,
};

export default loginController;
