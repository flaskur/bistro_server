import { Request, Response } from 'express';
import database from '../database/database';

const getVerify = async (request: Request, response: Response) => {
	const { id, hash } = request.query;

	const text = `
		select customer.hash from customer
		where customer.id = $1;
	`;
	const values = [
		id,
	];

	// VALIDATE EXISTING CUSTOMER
	const result = await database.query(text, values);
	if (!result.rows.length) {
		response.json({
			success: false,
			message: 'CUSTOMER ID DOES NOT EXIST',
		});
	}

	// VALIDATE DBHASH AND QUERY HASH MATCH
	const dbHash = result.rows[0].hash;
	if (hash === dbHash) {
		const text = `
			update customer
			set verified = $1
			where customer.id = $2
		`;
		const values = [
			true,
			id,
		];

		await database.query(text, values);
	}

	// ** should redirect to login page
	return response.json({
		success: true,
		message: 'SUCCESSFUL EMAIL VERIFICATION',
	});
};

const verifyController = {
	getVerify,
};

export default verifyController;
