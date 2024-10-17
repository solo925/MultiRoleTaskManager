import { Router } from 'express';
import { addComment } from '../controllers/commentController/commentController';

const router = Router();

router.post('/', addComment);

export default router;
