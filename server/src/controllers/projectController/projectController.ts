import { Request, Response } from 'express';
import { Project } from '../models/project';
import { xata } from '../utils/db';

export const createProject = async (req: Request, res: Response) => {
    const { name, teamId } = req.body;

    const newProject: Project = { id: Date.now().toString(), name, teamId };
    await xata.db.projects.create(newProject);
    res.status(201).json(newProject);
};

// Other CRUD operations for projects go here
