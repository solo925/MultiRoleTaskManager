import { createTask } from '../controllers/taskController/taskController';

import express from 'express';
const createTaskRoute = express.Router();

createTaskRoute.post('/', createTask);

export default createTaskRoute;
