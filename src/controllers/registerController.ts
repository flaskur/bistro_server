import { Request, Response } from 'express';

const postRegister = (request: Request, response: Response) => {
	const { email, password } = request.body;

	console.log(email, password);

	response.json({
		message: 'received post register',
	});
};

const registerController = {
	postRegister,
};

export default registerController;
