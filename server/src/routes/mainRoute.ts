import express from 'express';
import { loginRoute, logoutRoute, registerRoute } from './authRoute';
import commentRoute from './commentRoutes';
import createProjectRoute from './projectRoute';
import Tasks from './taskRoutes';
import Teamsroute from './teamRoutes';
import usersRoute from './usersRoute';


const mainRoute = express.Router();

mainRoute.use('/auth/register', registerRoute);
mainRoute.use('/auth/login', loginRoute);
mainRoute.use('/tasks', Tasks);
mainRoute.use('/projects', createProjectRoute);
mainRoute.use('/teams', Teamsroute);
mainRoute.use('/comments', commentRoute);
mainRoute.use('/logout', logoutRoute);
mainRoute.use('/users', usersRoute);



export default mainRoute;