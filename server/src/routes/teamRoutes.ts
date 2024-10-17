import { Router } from 'express';
import { createTeam, joinTeam, leaveTeam } from '../controllers/teamController/teamControler';

const router = Router();

router.post('/', createTeam);
router.post('/join', joinTeam);
router.post('/leave', leaveTeam);

export default router;
