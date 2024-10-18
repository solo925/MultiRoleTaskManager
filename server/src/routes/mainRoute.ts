import express from 'express';
import { loginRoute, logoutRoute, registerRoute } from './authRoute';
import createProjectRoute from './projectRoute';
import createTaskRoute from "./taskRoutes";


const mainRoute = express.Router();

mainRoute.use('/auth/register', registerRoute);
mainRoute.use('/auth/login', loginRoute);
mainRoute.use('/createtasks', createTaskRoute);
mainRoute.use('/projects', createProjectRoute);
mainRoute.use('/logout', logoutRoute);



export default mainRoute;