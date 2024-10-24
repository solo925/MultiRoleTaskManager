import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authenticateToken from '../../middlewares/accessControl/accessControl';
import { adminOnly } from '../../middlewares/accessControl/protectedRouteAdmin';
import { getXataClient } from '../../xata';


export const createTask = express.Router();
const xata = getXataClient();

dotenv.config();


// Create Task
// Create Task
createTask.post("/", authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { description, status, dueDate, projectName } = req.body;

    // Validate required fields
    if (!description || status === undefined || !dueDate || !projectName) {
        res.status(400).json({ error: "All fields are required!" });
        return;
    }

    try {
        // Extract JWT token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'Authorization header is missing' });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Token is missing' });
            return;
        }

        // Decode the token to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const assignedTo = decoded.id; // This should be the xata_id of the logged-in user

        // Get the project ID based on the project name
        const projectResult: any = await xata.sql`
            SELECT xata_id 
            FROM "project" 
            WHERE "NAME" = ${projectName};`;

        if (!projectResult.records || projectResult.records.length === 0) {
            res.status(404).json({ error: "Project not found." });
        }

        const projectId = projectResult.records[0].xata_id || process.env.projectId; // Use the xata_id of the found project

        // Insert the task into the database
        const result: any = await xata.sql`
            INSERT INTO "task" (
                "Project", 
                "assignedTold", 
                "description", 
                "dueDate", 
                "status"
            )
            VALUES (
                ${projectId}, 
                ${assignedTo}, 
                ${description}, 
                ${dueDate}, 
                ${status}
            )
            RETURNING *;`;

        res.status(201).json({
            message: "Task created successfully!",
            data: result.records[0],
        });
    } catch (error: any) {
        console.error("Error details:", error);
        res.status(500).json({ error: error.message });
    }
});




// Get All Tasks
createTask.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: any = await xata.sql`SELECT * FROM "task"`;
        res.status(200).json(tasks.records);  // Using the `rows` property
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get Single Task by ID
createTask.get("/:taskId", async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    try {
        const task: any = await xata.sql`
            SELECT * FROM "task" WHERE "xata_id" = ${taskId}`;

        if (!task || task.records.length === 0) {  // Correct way to access the result
            res.status(404).json({ error: "Task not found!" });
        }

        res.status(200).json(task.records[0]);  // Accessing the found task
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update Task by ID
createTask.put("/:id", authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { description, status, dueDate, projectName } = req.body;
    const taskId = req.params.id;

    // Validate required fields
    if (!description || status === undefined || !dueDate || !projectName) {
        res.status(400).json({ error: "All fields are required!" });
        return;
    }

    try {
        // Extract JWT token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'Authorization header is missing' });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Token is missing' });
            return;
        }

        // Decode the token to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const assignedTo = decoded.id; // This should be the xata_id of the logged-in user

        // Get the project ID based on the project name
        const projectResult: any = await xata.sql`
            SELECT xata_id 
            FROM "project" 
            WHERE "NAME" = ${projectName};`;

        if (!projectResult.records || projectResult.records.length === 0) {
            res.status(404).json({ error: "Project not found." });
            return;
        }

        const projectId = projectResult.records[0].xata_id; // Use the xata_id of the found project

        // Update the task with the new values, using the retrieved project ID and logged-in user's xata_id
        const result: any = await xata.sql`
            UPDATE "task"
            SET
                "description" = ${description}, 
                "status" = ${status}, 
                "dueDate" = ${dueDate}, 
                "assignedTold" = ${assignedTo}, 
                "Project" = ${projectId}
            WHERE "xata_id" = ${taskId}
            RETURNING *;`;

        if (result.records && result.records.length > 0) {
            res.status(200).json({
                message: "Task updated successfully!",
                data: result.records[0],
            });
        } else {
            res.status(404).json({ error: "Task not found or not updated." });
        }
    } catch (error: any) {
        console.error("Error details:", error);
        res.status(500).json({ error: error.message });
    }
});


// Delete Task by ID
createTask.delete("/:taskId", adminOnly, authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    try {
        const result: any = await xata.sql`
            DELETE FROM "task"
            WHERE "xata_id" = ${taskId}
            RETURNING *`;  // Use RETURNING to check if any row is deleted

        if (!result || result.records.length === 0) {  // Correct access to the result
            res.status(404).json({ error: "Task not found!" });
        }

        res.status(204).json({ message: "Task deleted successfully!" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default createTask;
