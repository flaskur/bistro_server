import express from 'express';
import registerController from '../controllers/register-controller';

const registerRouter = express.Router();

registerRouter.post('/', registerController.postRegister);

export default registerRouter;
