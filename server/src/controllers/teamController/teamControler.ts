import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getXataClient } from '../../xata';

export const teamRouter = express.Router();
const xata = getXataClient();

// Schema validation for creating/updating a team
const validateTeamSchema = {
    name: {
        in: ['body'],
        isString: true,
        errorMessage: "Name is required and should be a string"
    },
    description: {
        in: ['body'],
        isString: true,
        errorMessage: "Description is required and should be a string"
    }
};

// Create a Team
teamRouter.post("/", async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    try {
        // Insert new team into Xata database
        const result: any = await xata.sql`
            INSERT INTO "team" (name, description)
            VALUES (${name}, ${description})
            RETURNING *;`;

        res.status(201).json({
            message: "Team created successfully!",
            data: result.rows[0]
        });
    } catch (error: any) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get All Teams
teamRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const result: any = await xata.sql`SELECT * FROM "team";`;
        res.status(200).json(result.rows);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get Single Team by ID
teamRouter.get("/:teamId", async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;
    try {
        const result: any = await xata.sql`SELECT * FROM "team" WHERE "ID" = ${teamId};`;

        if (result.rows.length === 0) {
            res.status(404).json({ error: "Team not found!" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update Team by ID
teamRouter.put("/:teamId", async (req: Request, res: Response): Promise<void> => {
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
            WHERE "ID" = ${teamId}
            RETURNING *;`;

        if (result.rows.length === 0) {
            res.status(404).json({ error: "Team not found!" });
        }

        res.status(200).json({
            message: "Team updated successfully!",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Team by ID
teamRouter.delete("/:teamId", async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;

    try {
        const result: any = await xata.sql`
            DELETE FROM "team" WHERE "ID" = ${teamId}
            RETURNING *;`;

        if (result.rows.length === 0) {
            res.status(404).json({ error: "Team not found!" });
        }

        res.status(204).send(); // No content for delete success
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default teamRouter;
