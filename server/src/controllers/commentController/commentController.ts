import { Request, Response, Router } from 'express';
import authenticateToken from '../../middlewares/accessControl/accessControl'; // Import Token Middleware
import { getXataClient } from '../../xata'; // Import Xata Client

const commentController: Router = Router();

// Xata Client
const xata = getXataClient();

// Middleware to authorize a user for update/delete (either owner or admin)
const authorizeComment = async (req: Request, res: Response, next: Function) => {
    const commentId = req.params.id;
    const { id: userId, role } = req.user; // Assuming user is set by the authenticateToken middleware

    try {
        // Query to get the comment by its ID
        const query = await xata.sql`
            SELECT * FROM comments WHERE ID = ${parseInt(commentId)}
        `;

        if (!query || query.length === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const comment = query[0];

        // Check if the user is the owner of the comment or an admin
        if (comment.userId === userId || role === 'admin') {
            return next(); // Proceed to update/delete
        } else {
            return res.status(403).json({ message: 'Not authorized to modify this comment' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// 1. Create a new comment (only authenticated users can comment)
commentController.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { content, taskId } = req.body;
    const { id: userId } = req.user; // Get user ID from authenticated token

    try {
        // SQL query to insert a new comment using xata.sql
        await xata.sql`
            INSERT INTO comments (content, taskId, userId)
            VALUES (${content}, ${taskId}, ${userId})
        `;

        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
});

// 2. Get all comments (accessible to everyone)
commentController.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // SQL query to select all comments
        const comments = await xata.sql`SELECT * FROM comments`;

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve comments', error });
    }
});

// 3. Update comment (only owner or admin can update)
commentController.put('/:id', authenticateToken, authorizeComment, async (req: Request, res: Response): Promise<void> => {
    const { id: commentId } = req.params;
    const { content } = req.body;

    try {
        // SQL query to update the comment content by ID
        const result = await xata.sql`
            UPDATE comments SET content = ${content} WHERE ID = ${parseInt(commentId)}
        `;

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update comment', error });
    }
});

// 4. Delete comment (only owner or admin can delete)
commentController.delete('/:id', authenticateToken, authorizeComment, async (req: Request, res: Response): Promise<void> => {
    const { id: commentId } = req.params;

    try {
        // SQL query to delete the comment by ID
        const result = await xata.sql`
            DELETE FROM comments WHERE ID = ${parseInt(commentId)}
        `;

        // Check if the delete was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error });
    }
});

export default commentController;
