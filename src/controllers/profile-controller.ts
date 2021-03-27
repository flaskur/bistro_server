import { Request, Response } from 'express';
import database from '../database/database';
import jwt from 'jsonwebtoken';
import TokenShape from '../shared/token-shape';

const getProfile = async (request: Request, response: Response) => {
	const { token } = request.body;
	if (!token) {
		return response.json({
			success: false,
			message: 'MISSING AUTH TOKEN',
		});
	}

	// JWT VERIFY THROWS ERROR ON FAILURE AND EXPIRED TOKEN
	let verifiedToken: TokenShape;
	try {
		verifiedToken = jwt.verify(token, process.env.JWT_KEY!) as TokenShape; // NEED TO CAST TO ACCESS FIELDS BC VERIFY CAN FAIL
	} catch (e) {
		return response.json({
			success: false,
			message: 'INVALID AUTH TOKEN',
		});
	}
	if (!verifiedToken) {
		return response.json({
			success: false,
			message: 'INVALID AUTH TOKEN',
		});
	}

	const text = `
		select customer_id, email, first_name, last_name, phone_number, address, verified from customer
		where customer.customer_id = $1 and customer.email = $2
	`;
	const values = [
		verifiedToken.customerId,
		verifiedToken.email,
	];
	const result = await database.query(text, values);
	if (!result.rows.length) {
		return response.json({
			success: false,
			message: 'FAILED DATABASE QUERY',
		});
	}
	const profile = result.rows[0];

	return response.json({
		success: true,
		message: 'SUCCESSFUL PROFILE ACCESS',
		profile,
	});
};

const updateProfile = async (request: Request, response: Response) => {
	const { token, firstName, lastName, phoneNumber, address } = request.body; // might already be existing

	if (!token) {
		return response.json({
			success: false,
			message: 'MISSING AUTH TOKEN',
		});
	}

	// JWT VERIFY THROWS ERROR ON FAILURE AND EXPIRED TOKEN
	let verifiedToken: TokenShape;
	try {
		verifiedToken = jwt.verify(token, process.env.JWT_KEY!) as TokenShape; // NEED TO CAST TO ACCESS FIELDS BC VERIFY CAN FAIL
	} catch (e) {
		return response.json({
			success: false,
			message: 'INVALID AUTH TOKEN',
		});
	}
	if (!verifiedToken) {
		return response.json({
			success: false,
			message: 'INVALID AUTH TOKEN',
		});
	}

	const text = `
		update customer set
		first_name = $1,
		last_name = $2,
		phone_number = $3,
		address = $4
		where customer.customer_id = $5 and customer.email = $6
	`;
	const values = [
		firstName,
		lastName,
		phoneNumber,
		address,
		verifiedToken.customerId,
		verifiedToken.email,
	];

	// UPDATE SUCCESS DETERMINED BY ROWCOUNT AFFECTED --> DUPLICATE DATA IS STILL AN UPDATE
	const result = await database.query(text, values);
	if (result.rowCount < 1) {
		return response.json({
			success: false,
			message: 'FAILED PROFILE UPDATE',
		});
	}

	return response.json({
		success: true,
		message: 'SUCCESSFUL PROFILE UPDATE',
	});
};

const profileController = {
	getProfile,
	updateProfile,
};

export default profileController;
