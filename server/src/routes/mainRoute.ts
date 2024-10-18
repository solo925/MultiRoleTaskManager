import express from 'express';
import { authRegisterRoute } from "./authRoute";
import createProjectRoute from './projectRoute';
import createTaskRoute from "./taskRoutes";


const mainRoute = express.Router();

mainRoute.use('/auth/register', authRegisterRoute);
mainRoute.use('/createtasks', createTaskRoute);
mainRoute.use('/projects', createProjectRoute);



export default mainRoute;