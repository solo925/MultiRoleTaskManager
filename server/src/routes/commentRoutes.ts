import { Router } from 'express';
import commentController from '../controllers/commentController/commentController';

const commentRoute = Router();

commentRoute.use("/", commentController);

export default commentRoute;
