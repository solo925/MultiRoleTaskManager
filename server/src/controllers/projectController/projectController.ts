import express, { Request, Response } from 'express';
import authenticateToken, { CustomRequest1 } from '../../middlewares/accessControl/accessControl';
import { adminOnly } from '../../middlewares/accessControl/protectedRouteAdmin';
import { getXataClient } from '../../xata';
export const createProject = express.Router();

const xata = getXataClient();

// Ensure correct import for CustomRequest1

createProject.post("/", authenticateToken, async (req: CustomRequest1, res: Response): Promise<any> => {
    const { name } = req.body;

    // Validate that the name is provided
    if (!name) {
        return res.status(400).json({ error: "Name is required!" });
    }

    // Auto-generate the teamId
    const teamId = "id-00285243";  // Unique teamId generated on each request

    // Use the authenticated user's xata_id (if logged in) or fall back to a default adminId
    const userId = req.user?.xata_id;
    // Use the token's xata_id if available

    try {
        // Check if a project with the same name already exists
        const existingProjectResult: any = await xata.sql`
            SELECT * FROM "project" WHERE "NAME" = ${name};`;

        if (existingProjectResult.records && existingProjectResult.records.length > 0) {
            return res.status(409).json({ error: "A project with this name already exists." });
        }

        // Insert new project into the Xata database with the generated teamId and userId
        const insertResult: any = await xata.sql`
            INSERT INTO "project" ("NAME", "teamId")
            VALUES (${name}, ${teamId})
            RETURNING *;
        `;

        // Retrieve the newly inserted project
        const newProject: any = await xata.sql`
            SELECT * FROM "project" WHERE "NAME" = ${name} AND "teamId" = ${teamId} ORDER BY "xata_createdat" DESC LIMIT 1;
        `;

        // If the project was successfully created, return the result
        if (newProject.records && newProject.records.length > 0) {
            return res.status(201).json({
                message: "Project created successfully!",
                data: newProject.records[0],  // Return the inserted project
            });
        } else {
            return res.status(500).json({ error: "Failed to retrieve created project." });
        }
    } catch (error: any) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: error.message });
    }
});


// Get All Projects
createProject.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all projects from Xata
        const projects: any = await xata.sql`SELECT * FROM "project";`; // Remove RETURNING

        // Log the project data to help debug
        console.log("Projects retrieved:", projects);

        // Return the projects using the correct field (records)
        res.status(200).json({
            message: "Projects retrieved successfully!",
            data: projects.records  // Use records, not rows
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
            WHERE "xata_id" = ${projectId};`;

        // Check if any project was returned
        if (project.records.length === 0) {
            res.status(404).json({ error: "Project not found!" });
            return;
        }

        // Return the first record if found
        res.status(200).json({
            message: "Project retrieved successfully!",
            data: project.records[0]
        });
    } catch (error: any) {
        console.error("Error retrieving project:", error);
        res.status(500).json({ error: error.message });
    }
});


// Update Project by ID
createProject.put("/:projectId", adminOnly, authenticateToken, async (req: Request, res: Response): Promise<any> => {
    const { projectId } = req.params;
    const { NAME, teamId } = req.body;

    try {
        // Check if the project exists
        const existingProject = await xata.sql`
            SELECT * FROM "project" WHERE "xata_id" = ${projectId};`;

        if (existingProject.records.length === 0) {
            return res.status(404).json({ error: "Project not found!" });
        }

        // Check if the team exists
        const existingTeam = await xata.sql`
            SELECT * FROM "team" WHERE "xata_id" = ${teamId};`;

        if (existingTeam.records.length === 0) {
            return res.status(404).json({ error: "Team not found!" });
        }

        // Update project by ID in Xata
        const updatedProject: any = await xata.sql`
            UPDATE "project"
            SET "NAME" = ${NAME}, "teamId" = ${teamId}
            WHERE "xata_id" = ${projectId}
            RETURNING *;`;

        if (updatedProject.records.length === 0) {
            return res.status(404).json({ error: "Failed to update project." });
        }

        // Send response back
        res.status(200).json({
            message: "Project updated successfully!",
            data: updatedProject.records[0] // Use `.records` here
        });
    } catch (error: any) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: error.message });
    }
});


// Delete Project by ID
createProject.delete("/:projectId", adminOnly, authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;

    try {
        // Delete project by ID from Xata
        const deletedProject: any = await xata.sql`
            DELETE FROM "project"
            WHERE "xata_id" = ${projectId}
        RETURNING *; `;

        if (deletedProject.records.length === 0) {
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
    const { name, teamId } = req.params;

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
