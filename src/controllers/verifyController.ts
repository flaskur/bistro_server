import { Request, Response } from 'express';
import database from '../database/database';

const getVerify = async (request: Request, response: Response) => {
	console.log(request.query);

	const { id, hash } = request.query;
	console.log(`id ${id}, hash ${hash}`);

	const text = `
		select customer.hash from customer
		where customer.id = $1;
	`;

	const values = [
		id,
	];

	// failure if id doesn't exist in db, so empty rows
	const result = await database.query(text, values);
	if (!result.rows.length) {
		response.json({
			success: false,
			message: 'this id does not exist',
		});
	}

	const dbHash = result.rows[0].hash;

	console.log(`hash in db is ${dbHash}, hash of url is ${hash}`);

	// set verified to true
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

	return response.json({
		message: 'get verify finished',
		hash,
	});
};

const verifyController = {
	getVerify,
};

export default verifyController;
