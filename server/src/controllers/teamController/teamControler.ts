import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getXataClient } from '../../xata';

export const teamRouter = express.Router();
const xata = getXataClient();
interface customReq extends Request {
    user?: any
}

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
teamRouter.post("/", async (req: customReq, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    // Set default adminId value
    const adminId = "id-75405985";

    try {
        // Insert new team into Xata database with default adminId
        const result: any = await xata.sql`
            INSERT INTO "team" ("adminId", "description", "name")
            VALUES (${adminId}, ${name}, ${description})
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
teamRouter.delete("/:teamId", async (req: Request, res: Response): Promise<void> => {
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

export default teamRouter;
