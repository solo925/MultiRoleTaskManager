import express from 'express';
import { createProject } from '../controllers/projectController/projectController';

const createProjectRoute = express.Router();

createProjectRoute.use('/', createProject)
export default createProjectRoute;
