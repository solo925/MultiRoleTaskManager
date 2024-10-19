// routes/teamRoutes.ts
import express, { Request, Response } from 'express';
// import { authenticateUser } from '../../middlewares/authMiddlewares/authmiddleware';
import { teams } from '../../models/team';
import { deleteTeamById, getTeamById, updateTeamById } from '../../utils/teamUtils';

export const teamRouter = express.Router();

// Create Team
teamRouter.post("/", async (req: Request, res: Response): Promise<void> => {
    const { name, description } = req.body;

    // if (!req.user || !req.users.userId) {
    //     res.status(401).json({ error: "Unauthorized" });
    // }

    // const adminId = req.users.userId;
    // const newTeam: Team = { id: Date.now().toString(), name, description, adminId};
    const newTeam = { id: Date.now().toString(), name, description, adminId: req.user?.userId };

    teams.push(newTeam); // Simulate adding to the database
    res.status(201).json(newTeam);
    // });
});
// Get All Teams
teamRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(teams);
});

// Get Single Team by ID
teamRouter.get("/:teamId", async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;
    const team = getTeamById(teamId);

    if (!team) {
        res.status(404).json({ error: "Team not found!" });
    }

    res.status(200).json(team);
});

// Update Team by ID
teamRouter.put("/:teamId", async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;
    const updatedTeam = updateTeamById(teamId, req.body);

    if (!updatedTeam) {
        res.status(404).json({ error: "Team not found!" });
    }

    res.status(200).json(updatedTeam);
});

// Delete Team by ID
teamRouter.delete("/:teamId", async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;
    const deleted = deleteTeamById(teamId);

    if (!deleted) {
        res.status(404).json({ error: "Team not found!" });
    }

    res.status(204).send(); // No content for delete success
});
