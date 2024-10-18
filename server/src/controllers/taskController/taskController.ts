import express, { Request, Response } from 'express';
import { Task } from '../../models/task';
// import { xata } from '../utils/db';

export const createTask = express.Router();

createTask.post("/", async (req: Request, res: Response) => {
    const { description, status, dueDate, projectId, assignedToId } = req.body;

    const newTask: Task = {
        id: Date.now().toString(),
        description,
        status,
        dueDate,
        projectId,
        assignedToId
    };

    // await xata.db.tasks.create(newTask);
    res.status(201).json(newTask);
});

// Add filtering by project or member, and other CRUD operations for tasks
