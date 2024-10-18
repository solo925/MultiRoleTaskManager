import { Response } from 'express';
import { Comment } from '../../models/comments';
// import { xata } from '../utils/db';
import express from 'express';
import { commentType } from '../../types/commentypes';

const commentController = express.Router();

commentController.post("/", async (req: Request<{}, {}, commentType>, res: Response): Promise<void> => {
    const { content, taskId } = req.body;
    const userId = req.user.userId;

    const newComment: Comment = { id: Date.now().toString(), content, taskId, userId };
    // await xata.db.comments.create(newComment);
    res.status(201).json(newComment);
});
