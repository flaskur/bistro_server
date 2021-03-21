import { Request, Response } from 'express';
import database from '../database/database';

const getMenu = async (_: Request, response: Response) => {
	const text = `select * from food;`;
	const res = await database.query(text);
	if (!res.rows) {
		return response.json({
			success: false,
			message: 'FAIL MENU ACCESS',
		});
	}

	return response.json({
		success: true,
		message: 'SUCCESSFUL MENU ACCESS',
		menu: res.rows,
	});
};

const menuController = {
	getMenu,
};

export default menuController;
