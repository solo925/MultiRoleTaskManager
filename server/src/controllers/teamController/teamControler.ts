import { Request, Response } from 'express';
import { Team } from '../models/team';
import { xata } from '../utils/db';

export const createTeam = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const adminId = req.user.userId;

    const newTeam: Team = { id: Date.now().toString(), name, description, adminId };
    await xata.db.teams.create(newTeam);
    res.status(201).json(newTeam);
};

export const joinTeam = async (req: Request, res: Response) => {
    // Implement logic for a user to join a team
};

export const leaveTeam = async (req: Request, res: Response) => {
    // Implement logic for a user to leave a team
};
