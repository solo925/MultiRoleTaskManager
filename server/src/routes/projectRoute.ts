import { Router } from 'express';
import { createProject } from '../controllers/projectController/projectController';

const router = Router();

router.post('/', createProject);

export default router;
