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
