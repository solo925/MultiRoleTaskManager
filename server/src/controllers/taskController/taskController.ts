import express, { Request, Response } from 'express';
import { getXataClient } from '../../xata';

export const createTask = express.Router();
const xata = getXataClient();

// Create Task
// Create Task
createTask.post("/", async (req: Request, res: Response): Promise<void> => {
    const { description, status, dueDate } = req.body;

    // Validate required fields
    if (!description || status === undefined || !dueDate) {
        res.status(400).json({ error: "All fields are required!" });
    }

    try {
        // Ensure the dueDate is in proper format
        const result: any = await xata.sql`
            INSERT INTO "task" (description, status, "dueDate")
            VALUES (${description}, ${status}, ${dueDate})
            RETURNING *`;

        res.status(201).json({ message: "Task created successfully!", data: result.rows[0] });
    } catch (error: any) {
        console.error("Error details:", error);
        res.status(500).json({ error: error.message });
    }
});


// Get All Tasks
createTask.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: any = await xata.sql`SELECT * FROM "task"`;
        res.status(200).json(tasks.rows);  // Using the `rows` property
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

        if (!task || task.rows.length === 0) {  // Correct way to access the result
            res.status(404).json({ error: "Task not found!" });
        }

        res.status(200).json(task.rows[0]);  // Accessing the found task
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update Task by ID
createTask.put("/:taskId", async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { description, status, dueDate, projectId, assignedToId } = req.body;

    try {
        const result: any = await xata.sql`
            UPDATE "tasks"
            SET description = ${description}, status = ${status}, "dueDate" = ${dueDate}, 
                "projectId" = ${projectId}, "assignedToId" = ${assignedToId}
            WHERE "xata_id" = ${taskId}
            RETURNING *`;  // Use RETURNING to get the updated task

        if (!result || result.rows.length === 0) {  // Correct access to the result
            res.status(404).json({ error: "Task not found!" });
        }

        res.status(200).json({ message: "Task updated successfully!", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Task by ID
createTask.delete("/:taskId", async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    try {
        const result: any = await xata.sql`
            DELETE FROM "tasks"
            WHERE "xata_id" = ${taskId}
            RETURNING *`;  // Use RETURNING to check if any row is deleted

        if (!result || result.rows.length === 0) {  // Correct access to the result
            res.status(404).json({ error: "Task not found!" });
        }

        res.status(204).json({ message: "Task deleted successfully!" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default createTask;
