import express from 'express';
import profileController from '../controllers/profile-controller';

const profileRouter = express.Router();

profileRouter.get('/', profileController.getProfile);
profileRouter.patch('/', profileController.updateProfile);

export default profileRouter;
