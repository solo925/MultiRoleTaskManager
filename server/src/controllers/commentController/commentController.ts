import { Request, Response, Router } from 'express';
import authenticateToken from '../../middlewares/accessControl/accessControl';
import { getXataClient } from '../../xata'; // Import Xata Client

export const commentController: Router = Router();

// Xata Client
const xata = getXataClient();

// Default taskId (assuming this is static and you can change as needed)
const defaultTaskId = 'id-20022662';  // The default task ID to use for comments

// Middleware to authorize a user for update/delete (either owner or admin)
interface cus extends Request {
    user?: any
}

// 1. Create a new comment (only authenticated users can comment)
commentController.post('/', authenticateToken, async (req: cus, res: Response): Promise<void> => {
    const { comment } = req.body;
    const userId = "rec_csavjvtqrj64enfmlpmg"// Only comment is required, taskId and userId will be inferred
    // const { id: userId } = req.user; // Get user ID from authenticated token

    try {
        // SQL query to insert a new comment using xata.sql
        const result: any = await xata.sql`
            INSERT INTO "comment" ("comment", "taskId", "userId")
            VALUES (${comment}, ${defaultTaskId}, ${userId})
            RETURNING *;
        `;

        res.status(201).json({ message: 'Comment created successfully', data: result.records[0] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
});

// 2. Get all comments (accessible to everyone)
commentController.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // SQL query to select all comments
        const comments = await xata.sql`SELECT * FROM "comment"`;

        res.status(200).json({ comments: comments.records });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve comments', error });
    }
});

// 3. Update comment (only owner or admin can update)
commentController.put('/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id: commentId } = req.params;
    const { comment } = req.body; // Only comment needs to be provided

    try {
        // SQL query to update the comment content by ID
        const result = await xata.sql`
            UPDATE "comment"
            SET "comment" = ${comment}
            WHERE "xata_id" = ${commentId}
            RETURNING *;
        `;

        // Check if the update was successful
        if (!result || result.records.length === 0) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        res.status(200).json({ message: 'Comment updated successfully', data: result.records[0] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update comment', error });
    }
});

// 4. Delete comment (only owner or admin can delete)
commentController.delete('/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { id: commentId } = req.params;

    try {
        // SQL query to delete the comment by ID
        const result = await xata.sql`
            DELETE FROM "comment"
            WHERE "xata_id" = ${commentId}
            RETURNING *;
        `;

        // Check if the delete was successful
        if (!result || result.records.length === 0) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error });
    }
});

export default commentController;
