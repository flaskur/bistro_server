import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import Customer from '../models/customer';
import database from '../database/database';

dotenv.config();

const postRegister = async (request: Request, response: Response) => {
	const { email, password } = request.body;

	// VALIDATE EXISTING EMAIL
	const text = `
		select customer.email from customer 
		where customer.email = $1
	`;
	const existingEmail = (await database.query(text, email)).rows.length > 0;
	if (!existingEmail) {
		return response.json({
			success: false,
			message: 'EMAIL ALREADY EXISTS',
		});
	}

	const customer = new Customer(email, password);
	const result = await customer.save();

	// VALIDATE CUSTOMER SAVED
	if (!result) {
		return response.json({
			success: false,
			message: 'FAILED TO REGISTER CUSTOMER',
		});
	}

	// ** need to attach to ab email and send to email argument
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 8000,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	await transporter.sendMail({
		from: process.env.EMAIL,
		to: process.env.EMAIL2,
		subject: 'Bistro Email Verification',
		html: `
			<div>
				<h3 style="background-color: pink">Please click the link below to verify your email.</h3>
				<a href="http://localhost:3001/verify?id=${customer.id}&hash=${customer.hash}">Verify Email</a>
			</div>
		`,
	});

	return response.json({
		success: true,
		message: 'SUCCESSFUL REGISTER CUSTOMER',
	});
};

const registerController = {
	postRegister,
};

export default registerController;
