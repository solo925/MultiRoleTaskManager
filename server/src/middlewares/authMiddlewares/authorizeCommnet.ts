// export const authorizeComment = async (req: Request, res: Response, next: Function) => {
//     const commentId = req.params.id;
//     const { id: userId, role } = req.user; // Assuming user is set by the authenticateToken middleware

//     try {
//         const comment = await xata.db.comment.filter({ ID: parseInt(commentId) }).getFirst();

//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         // Check if the user is the owner of the comment or an admin
//         if (comment.userId === userId || role === 'admin') {
//             return next(); // Proceed to update/delete
//         } else {
//             return res.status(403).json({ message: 'Not authorized to modify this comment' });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'Server error', error });
//     }
// };