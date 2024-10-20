// routes/projectRoutes.ts
import express, { Request, Response } from 'express';
import { Project, projects } from '../../models/project';
import { deleteProjectById, getProjectById, updateProjectById } from '../../utils/projectUtils';

export const createProject = express.Router();

// Create Project
createProject.post("/", async (req: Request, res: Response): Promise<void> => {
    const { name, teamId } = req.body;

    if (!name || !teamId) {
        res.status(400).json({ error: "Name and teamId are required!" });
    }

    const newProject: Project = { id: Date.now().toString(), name, teamId };

    projects.push(newProject); // Add project to dummy database
    res.status(201).json(newProject);
});

// Get All Projects
createProject.get("/", async (req: Request, res: Response) => {
    res.status(200).json(projects);
});

// Get Single Project by ID
createProject.get("/:projectId", async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const project = getProjectById(projectId);

    if (!project) {
        res.status(404).json({ error: "Project not found!" });
    }

    res.status(200).json(project);
});

// Update Project by ID
createProject.put("/:projectId", async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const updatedProject = updateProjectById(projectId, req.body);

    if (!updatedProject) {
        res.status(404).json({ error: "Project not found!" });
    }

    res.status(200).json({ message: "Project updated successfully!", data: updatedProject });
});

// Delete Project by ID
createProject.delete("/:projectId", async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const deleted = deleteProjectById(projectId);

    if (!deleted) {
        res.status(404).json({ error: "Project not found!" });
    }

    res.status(204).json({ message: "Project deleted successfully!" }); // No content
});

// Get Projects by Team ID
createProject.get("/team/:teamId", async (req: Request, res: Response) => {
    const { teamId } = req.params;
    const filteredProjects = projects.filter(project => project.teamId === teamId);
    res.status(200).json(filteredProjects);
});
