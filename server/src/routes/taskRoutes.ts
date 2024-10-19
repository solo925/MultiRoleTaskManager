import { createTask } from '../controllers/taskController/taskController';

import express from 'express';
const Tasks = express.Router();

Tasks.use('/', createTask);
Tasks.use('/', createTask)


export default Tasks;
