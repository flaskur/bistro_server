import express from 'express';
import menuController from '../controllers/menu-controller';

const menuRouter = express.Router();

menuRouter.get('/', menuController.getMenu);

export default menuRouter;
