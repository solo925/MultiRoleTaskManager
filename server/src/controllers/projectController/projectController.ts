import express, { Request, Response } from 'express';
import authenticateToken from '../../middlewares/accessControl/accessControl'; // Ensure that this is your correct Xata client import
import { getXataClient } from '../../xata';

export const createProject = express.Router();
const xata = getXataClient();



// Create Project
createProject.post("/", async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: "Name is required!" });
    }

    try {
        // Check if a project with the same name already exists
        // const result: any = await xata.sql`
        //     SELECT * FROM "project" WHERE "NAME" = ${name};`;

        // if (result.rows && result.rows.length > 0) {
        //     res.status(409).json({ error: "A project with this name already exists." });
        // }

        // Insert new project into the Xata database
        const insertResult: any = await xata.sql`
            INSERT INTO "project" ("NAME")
            VALUES (${name})`;

        res.status(201).json({
            message: "Project created successfully!",
            data: insertResult.rows[0]  // Returning the created project
        });
    } catch (error: any) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: error.message });
    }
});



// Get All Projects
createProject.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all projects from Xata
        const projects: any = await xata.sql`SELECT * FROM "project"; `;

        res.status(200).json({
            message: "Projects retrieved successfully!",
            data: projects.rows
        });
    } catch (error: any) {
        console.error("Error retrieving projects:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Single Project by ID
createProject.get("/:projectId", async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;

    try {
        // Fetch single project by ID from Xata
        const project: any = await xata.sql`
        SELECT * FROM "project"
            WHERE "ID" = ${projectId}; `;

        if (project.rows.length === 0) {
            res.status(404).json({ error: "Project not found!" });
        }

        res.status(200).json({
            message: "Project retrieved successfully!",
            data: project.rows[0]
        });
    } catch (error: any) {
        console.error("Error retrieving project:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update Project by ID
createProject.put("/:projectId", authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const { name, teamId } = req.body;

    try {
        // Update project by ID in Xata
        const updatedProject: any = await xata.sql`
            UPDATE "project"
            SET "NAME" = ${name}, "teamId" = ${teamId}
            WHERE "ID" = ${projectId}
        RETURNING *; `;

        if (updatedProject.rows.length === 0) {
            res.status(404).json({ error: "Project not found!" });
        }

        res.status(200).json({
            message: "Project updated successfully!",
            data: updatedProject.rows[0]
        });
    } catch (error: any) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: error.message });
    }
});

// Delete Project by ID
createProject.delete("/:projectId", async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;

    try {
        // Delete project by ID from Xata
        const deletedProject: any = await xata.sql`
            DELETE FROM "project"
            WHERE "ID" = ${projectId}
        RETURNING *; `;

        if (deletedProject.rows.length === 0) {
            res.status(404).json({ error: "Project not found!" });
        }

        res.status(204).json({
            message: "Project deleted successfully!"
        });
    } catch (error: any) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Projects by Team ID
createProject.get("/team/:teamId", async (req: Request, res: Response): Promise<void> => {
    const { teamId } = req.params;

    try {
        // Fetch projects by teamId from Xata
        const projectsByTeam: any = await xata.sql`
        SELECT * FROM "project"
            WHERE "teamId" = ${teamId}; `;

        if (projectsByTeam.rows.length === 0) {
            res.status(404).json({ error: `No projects found for team with ID ${teamId}.` });
        }

        res.status(200).json({
            message: "Projects retrieved successfully!",
            data: projectsByTeam.rows
        });
    } catch (error: any) {
        console.error("Error retrieving projects by team:", error);
        res.status(500).json({ error: error.message });
    }
});

// import express, { Request, Response } from 'express';
// import { getXataClient } from '../../xata';
// import authenticateToken from '../../middlewares/accessControl/accessControl'; // Ensure that this is your correct Xata client import

// export const createProject = express.Router();
// const xata = getXataClient();

// // Middleware to authorize the user for update/delete (owner or admin)
// const authorizeProject = async (req: Request, res: Response, next: Function) => {
//     const { projectId } = req.params;
//     const { id: userId, role } = req.user; // Assuming user is set by the authenticateToken middleware

//     try {
//         // Fetch the project by ID
//         const project: any = await xata.sql`
//             SELECT * FROM "project" WHERE "ID" = ${projectId};
//         `;

//         if (!project || project.rows.length === 0) {
//             return res.status(404).json({ error: 'Project not found!' });
//         }

//         const projectData = project.rows[0];

//         // If the user is the owner or an admin, allow the operation
//         if (projectData.userId === userId || role === 'admin') {
//             return next();
//         } else {
//             return res.status(403).json({ error: 'Not authorized to modify this project' });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to authorize', error });
//     }
// };

// // Create Project
// createProject.post("/", authenticateToken, async (req: Request, res: Response): Promise<void> => {
//     const { name } = req.body;
//     const { id: userId } = req.user; // Get user ID from authenticated token

//     if (!name) {
//         return res.status(400).json({ error: "Name is required!" });
//     }

//     try {
//         // Insert new project into the Xata database
//         const insertResult: any = await xata.sql`
//             INSERT INTO "project" ("NAME", "userId")
//             VALUES (${name}, ${userId})
//             RETURNING *;`;

//         res.status(201).json({
//             message: "Project created successfully!",
//             data: insertResult.rows[0]  // Returning the created project
//         });
//     } catch (error: any) {
//         console.error("Error creating project:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get All Projects (Accessible to everyone)
// createProject.get("/", async (req: Request, res: Response): Promise<void> => {
//     try {
//         // Fetch all projects from Xata
//         const projects: any = await xata.sql`SELECT * FROM "project";`;

//         res.status(200).json({
//             message: "Projects retrieved successfully!",
//             data: projects.rows
//         });
//     } catch (error: any) {
//         console.error("Error retrieving projects:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get Single Project by ID (Accessible to everyone)
// createProject.get("/:projectId", async (req: Request, res: Response): Promise<void> => {
//     const { projectId } = req.params;

//     try {
//         // Fetch single project by ID from Xata
//         const project: any = await xata.sql`
//         SELECT * FROM "project"
//             WHERE "ID" = ${projectId};`;

//         if (project.rows.length === 0) {
//             return res.status(404).json({ error: "Project not found!" });
//         }

//         res.status(200).json({
//             message: "Project retrieved successfully!",
//             data: project.rows[0]
//         });
//     } catch (error: any) {
//         console.error("Error retrieving project:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update Project by ID (Only the owner or admin can update)
// createProject.put("/:projectId", authenticateToken, authorizeProject, async (req: Request, res: Response): Promise<void> => {
//     const { projectId } = req.params;
//     const { name, teamId } = req.body;

//     try {
//         // Update project by ID in Xata
//         const updatedProject: any = await xata.sql`
//             UPDATE "project"
//             SET "NAME" = ${name}, "teamId" = ${teamId}
//             WHERE "ID" = ${projectId}
//             RETURNING *;`;

//         if (updatedProject.rows.length === 0) {
//             return res.status(404).json({ error: "Project not found!" });
//         }

//         res.status(200).json({
//             message: "Project updated successfully!",
//             data: updatedProject.rows[0]
//         });
//     } catch (error: any) {
//         console.error("Error updating project:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete Project by ID (Only the owner or admin can delete)
// createProject.delete("/:projectId", authenticateToken, authorizeProject, async (req: Request, res: Response): Promise<void> => {
//     const { projectId } = req.params;

//     try {
//         // Delete project by ID from Xata
//         const deletedProject: any = await xata.sql`
//             DELETE FROM "project"
//             WHERE "ID" = ${projectId}
//             RETURNING *;`;

//         if (deletedProject.rows.length === 0) {
//             return res.status(404).json({ error: "Project not found!" });
//         }

//         res.status(204).json({
//             message: "Project deleted successfully!"
//         });
//     } catch (error: any) {
//         console.error("Error deleting project:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get Projects by Team ID (Accessible to everyone)
// createProject.get("/team/:teamId", async (req: Request, res: Response): Promise<void> => {
//     const { teamId } = req.params;

//     try {
//         // Fetch projects by teamId from Xata
//         const projectsByTeam: any = await xata.sql`
//         SELECT * FROM "project"
//             WHERE "teamId" = ${teamId};`;

//         if (projectsByTeam.rows.length === 0) {
//             return res.status(404).json({ error: `No projects found for team with ID ${teamId}.` });
//         }

//         res.status(200).json({
//             message: "Projects retrieved successfully!",
//             data: projectsByTeam.rows
//         });
//     } catch (error: any) {
//         console.error("Error retrieving projects by team:", error);
//         res.status(500).json({ error: error.message });
//     }
// });
