import express from 'express';
import verifyController from '../controllers/verify-controller';

const verifyRouter = express.Router();

verifyRouter.get('/', verifyController.getVerify);

export default verifyRouter;
