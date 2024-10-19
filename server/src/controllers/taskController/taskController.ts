// routes/taskRoutes.ts
import express, { Request, Response } from 'express';
import { Task, tasks } from '../../models/task';
import { deleteTaskById, getTaskById, updateTaskById } from '../../utils/TaskUtils';

export const createTask = express.Router();

// Create Task
createTask.post("/create", async (req: Request, res: Response): Promise<void> => {
    const { description, status, dueDate, projectId, assignedToId } = req.body;

    if (!description || !status || !dueDate || !projectId || !assignedToId) {
        res.status(400).json({ error: "All fields are required!" });
    }

    const newTask: Task = {
        id: Date.now().toString(),
        description,
        status,
        dueDate,
        projectId,
        assignedToId
    };

    tasks.push(newTask); // Add task to dummy database
    res.status(201).json(newTask);
});

// Get All Tasks
createTask.get("/", async (req: Request, res: Response) => {
    res.status(200).json(tasks);
});

// Get Single Task by ID
createTask.get("/:taskId", async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const task = getTaskById(taskId);

    if (!task) {
        res.status(404).json({ error: "Task not found!" });
    }

    res.status(200).json(task);
});

// Update Task by ID
createTask.put("/:taskId", async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const updatedTask = updateTaskById(taskId, req.body);

    if (!updatedTask) {
        res.status(404).json({ error: "Task not found!" });
    }

    res.status(200).json(updatedTask);
});

// Delete Task by ID
createTask.delete("/:taskId", async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const deleted = deleteTaskById(taskId);

    if (!deleted) {
        res.status(404).json({ error: "Task not found!" });
    }

    res.status(204).send(); // No content
});

// Get tasks by projectId
createTask.get("/project/:projectId", async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const filteredTasks = tasks.filter(task => task.projectId === projectId);
    res.status(200).json(filteredTasks);
});

// Get tasks by assignedToId
createTask.get("/assigned/:assignedToId", async (req: Request, res: Response) => {
    const { assignedToId } = req.params;
    const filteredTasks = tasks.filter(task => task.assignedToId === assignedToId);
    res.status(200).json(filteredTasks);
});
