import { Router } from 'express';
import { teamRouter } from '../controllers/teamController/teamControler';

const Teamsroute = Router();


Teamsroute.use('/', teamRouter);
// Teamsroute.get('/users', getUserTeams);

// router.post('/join', joinTeam);
// router.post('/leave', leaveTeam);

export default Teamsroute;
