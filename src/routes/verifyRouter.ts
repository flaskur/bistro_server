import express from 'express';
import verifyController from '../controllers/verifyController';

const verifyRouter = express.Router();

verifyRouter.get('/', verifyController.getVerify);

export default verifyRouter;
