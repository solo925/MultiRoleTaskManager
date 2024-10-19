// import express, { Request, Response } from 'express';
// import { Comment } from '../../models/comments';
// import { CustomeRequest } from '../../types/CustomeReuest';
// import { getXataClient } from '../../xata';

// // Extend the Express Request type to include the custom 'users' field
// // interface CustomRequest1 extends Request {
// //     content: string;
// //     taskId: string;
// //     users:{
// //     usherID:any;
// //     }
// // }

// const xata = getXataClient();
// const commentController = express.Router();

// commentController.post("/", async (req: Request<{}, {}, CustomeRequest>, res: Response): Promise<void> => {
//     const { content, taskId } = req.body;

//     // Access the userId from the custom request

//     const userId = req.users.userId;


//     // Ensure the structure of 'newComment' matches what Xata expects
//     const newComment: Comment = {
//         id: Date.now().toString(),
//         content,
//         taskId,
//         userId
//     };

//     try {
//         const createdComment = await xata.db.comment.create(newComment);
//         res.status(201).json(createdComment);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating comment", error });
//     }
// });

// export default commentController;

import express, { Request, Response } from 'express';

const commentController = express.Router();

// Dummy data
const comments: Comment[] = [
    { id: '1', content: 'This is a test comment', taskId: '101', userId: '1' },
    { id: '2', content: 'Another comment for testing', taskId: '102', userId: '2' },
];

// Utility function to get a comment by ID
function getCommentById(id: string): Comment | undefined {
    return comments.find(comment => comment.id === id);
}

// Create a new comment
commentController.post("/", (req: Request, res: Response) => {
    const { content, taskId, userId } = req.body;

    const newComment: Comment = {
        id: Date.now().toString(),
        content,
        taskId,
        userId
    };

    comments.push(newComment);
    res.status(201).json(newComment);
});

// Get all comments
commentController.get("/", (req: Request, res: Response) => {
    res.json(comments);
});

// Get a single comment by ID
commentController.get("/:id", (req: Request, res: Response) => {
    const comment = getCommentById(req.params.id);

    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
});

// Update a comment by ID
commentController.put("/:id", (req: Request, res: Response) => {
    const comment = getCommentById(req.params.id);

    if (comment) {
        const { content, taskId } = req.body;
        comment.content = content || comment.content;
        comment.taskId = taskId || comment.taskId;
        res.json(comment);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
});

// Delete a comment by ID
commentController.delete("/:id", (req: Request, res: Response) => {
    const commentIndex = comments.findIndex(comment => comment.id === req.params.id);

    if (commentIndex !== -1) {
        const deletedComment = comments.splice(commentIndex, 1);
        res.json(deletedComment[0]);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
});

export default commentController;

