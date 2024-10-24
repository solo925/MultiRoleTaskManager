import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import authenticateToken from '../../middlewares/accessControl/accessControl';
import { adminOnly } from '../../middlewares/accessControl/protectedRouteAdmin';
import { getXataClient } from '../../xata';

export const teamRouter = express.Router();
const xata = getXataClient();
dotenv.config();
interface customReq extends Request {
    user?: any
}

// Schema validation for creating/updating a team

// Create a Team
teamRouter.post("/", adminOnly, authenticateToken, async (req: customReq, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Add return to prevent further execution if there are validation errors
    }

    const { name, description } = req.body;

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

    // Decode the token to get the user ID (xata_id of the logged-in user)
    let adminId: string;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        adminId = decoded.id; // This should be the xata_id of the logged-in user
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }

    try {
        // Insert new team into Xata database with adminId set to the logged-in user's xata_id
        const result: any = await xata.sql`
            INSERT INTO "team" ("adminId", "description", "name")
            VALUES (${adminId}, ${description}, ${name})
            RETURNING *;`;

        res.status(201).json({
            message: "Team created successfully!",
            data: result.records[0],
        });
    } catch (error: any) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: error.message });
    }
});


// Get All Teams
teamRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all teams from Xata
        const result: any = await xata.sql`SELECT * FROM "team";`;

        // Respond with the teams
        res.status(200).json(result.records);
    } catch (error: any) {
        // Handle any errors that occur during the query
        res.status(500).json({ error: error.message });
    }
});


// Get Single Team by ID
teamRouter.get("/:teamId", async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;
    try {
        const result: any = await xata.sql`SELECT * FROM "team" WHERE "xata_id" = ${teamId};`;

        // Corrected typo from "recorsd" to "records"
        if (result.records.length === 0) {
            res.status(404).json({ error: "Team not found!" });
            return;
        }

        res.status(200).json(result.records[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update Team by ID
teamRouter.put("/:teamId", adminOnly, async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { teamId } = req.params;
    const { name, description } = req.body;

    try {
        const result: any = await xata.sql`
            UPDATE "team"
            SET name = ${name}, description = ${description}
            WHERE "xata_id" = ${teamId}
            RETURNING *;`;

        if (result.records.length === 0) {
            res.status(404).json({ error: "Team not found!" });
        }

        res.status(200).json({
            message: "Team updated successfully!",
            data: result.records[0]
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Team by ID
teamRouter.delete("/:teamId", adminOnly, authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;

    try {
        const result: any = await xata.sql`
            DELETE FROM "team" WHERE "xata_id" = ${teamId}
            RETURNING *;`;

        if (result.records.length === 0) {
            res.status(404).json({ error: "Team not found!" });
        }

        res.status(204).json({ message: "Team deleted successfully!" }); // No content for delete success
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Adjust this path based on your project structure

teamRouter.get("/user/tasks", async (req: Request, res: Response): Promise<void> => {
    const xata = getXataClient();
    // const us = "id-66787921" //for testing

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
        const userId = decoded.id;
        // const userId = us

        // SQL query to get all tasks assigned to the logged-in user
        const result: any = await xata.sql`
     SELECT *
FROM task tk
WHERE tk."assignedTold" = ${userId};

      `;

        // Log the query result for debugging
        console.log("Tasks for user:", result);
        console.log("userId", userId)

        // Check if tasks were found and return them
        if (result && result.records.length > 0) {
            res.status(200).json({ tasks: result.records });
        } else {
            res.status(404).json({ message: 'this user has no tasks assigned to him' });
        }
    } catch (error: any) {
        console.error('Error fetching user tasks:', error);
        res.status(500).json({ error: 'An error occurred while fetching user tasks', details: error.message });
    }
});



teamRouter.get("/user/projects", async (req: Request, res: Response): Promise<void> => {
    const xata = getXataClient();

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
        const userId = decoded.id; // This should be the xata_id of the logged-in user

        // SQL query to get projects related to tasks assigned to the user
        const result: any = await xata.sql`
        SELECT DISTINCT p.*
        FROM task tk
        JOIN project p ON tk."Project" = p.xata_id
        WHERE tk."assignedTold" = ${userId}

      `;

        // Log the query result for debugging
        console.log("Projects for user:", result);

        // Check if projects were found and return them
        if (result && result.records.length > 0) {
            res.status(200).json({ projects: result.records });
        } else {
            res.status(404).json({ message: 'No projects found for the user' });
        }
    } catch (error: any) {
        console.error('Error fetching user projects:', error);
        res.status(500).json({ error: 'An error occurred while fetching user projects', details: error.message });
    }
});

teamRouter.get("/user/teams", async (req: Request, res: Response): Promise<void> => {
    const xata = getXataClient();

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
        const userId = decoded.id; // This should be the xata_id of the logged-in user

        // SQL query to get teams related to projects of tasks assigned to the user
        const result: any = await xata.sql`
        SELECT DISTINCT t.*
        FROM team t
        JOIN project p ON t.xata_id = p."teamId"
        JOIN task tk ON p.xata_id = tk."Project"
        WHERE tk."assignedTold" = ${userId}
      `;

        // Log the query result for debugging
        console.log("Teams for user:", result);

        // Check if teams were found and return them
        if (result && result.records.length > 0) {
            res.status(200).json({ teams: result.records });
        } else {
            res.status(404).json({ message: 'No teams found for the user' });
        }
    } catch (error: any) {
        console.error('Error fetching user teams:', error);
        res.status(500).json({ error: 'An error occurred while fetching user teams', details: error.message });
    }
});





export default teamRouter;
