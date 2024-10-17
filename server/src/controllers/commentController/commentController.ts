import { Response } from 'express';
import { Comment } from '../../models/comments';
// import { xata } from '../utils/db';
import { CustomeRequest } from '../../types/CustomeReuest';

export const addComment = async (req: CustomeRequest, res: Response) => {
    const { content, taskId } = req.body;
    const userId = req.user.userId;

    const newComment: Comment = { id: Date.now().toString(), content, taskId, userId };
    // await xata.db.comments.create(newComment);
    res.status(201).json(newComment);
};
