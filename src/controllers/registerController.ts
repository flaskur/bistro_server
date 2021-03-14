import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import Customer from '../models/customer';

dotenv.config();

const postRegister = async (request: Request, response: Response) => {
	const { email, password, firstName } = request.body;
	console.log(email, password, firstName);

	const customer = new Customer(email, password);
	customer.firstName = firstName;
	const result = await customer.save(); // might fail, should res json on result === false
	console.log(`result returned is ${result}`);
	if (!result) {
		return response.json({
			errorMessage: 'failed to save for post register',
			error: true,
		});
	}

	// send a verification email on register
	// the link should trigger a get request and have the token attached to url --> make verify email route

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 8000,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	let info = await transporter.sendMail({
		from: process.env.EMAIL,
		to: process.env.EMAIL2,
		subject: 'hey there fellow',
		text: 'some plain text',
		html: `
			<div>
				<h1 style="background-color: pink">verify header3</h1>
				<a href="http://localhost:3001/verify?hash=${customer.hash}">Verify Email</a>
			</div>
		`,
	});

	console.log('sent info', info.messageId);

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	return response.json({
		message: 'received post register',
		error: false,
	});
};

const registerController = {
	postRegister,
};

export default registerController;
