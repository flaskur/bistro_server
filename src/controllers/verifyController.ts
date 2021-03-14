import { Request, Response } from 'express';

const getVerify = (request: Request, response: Response) => {
	console.log(request.query);

	const { hash } = request.query;
	console.log('got hash of', hash);

	// compare hash to db hash, if match then set verify to true

	return response.json({
		message: 'get verify finished',
		hash,
	});
};

const verifyController = {
	getVerify,
};

export default verifyController;
