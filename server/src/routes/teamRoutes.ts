import { Router } from 'express';
import { teamRouter } from '../controllers/teamController/teamControler';

const Teamsroute = Router();

Teamsroute.use('/', teamRouter);
// router.post('/join', joinTeam);
// router.post('/leave', leaveTeam);

export default Teamsroute;
