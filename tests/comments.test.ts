import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import commentController from '../server/src/controllers/commentController/commentController'; 

// Set up the Express app for testing
const app = express();
app.use(bodyParser.json());
app.use('/comments', commentController);

describe('Comment Controller', () => {
    const testComment = { comment: 'This is a test comment' };
    const updatedComment = { comment: 'This is an updated comment' };
    let commentId: string;

    // Test creating a new comment
    it('should create a new comment', async () => {
        const res = await request(app)
            .post('/comments')
            .send(testComment);

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Comment created successfully');
        expect(res.body.data).toHaveProperty('xata_id');
        commentId = res.body.data.xata_id;
    });

    // Test retrieving all comments
    it('should get all comments', async () => {
        const res = await request(app).get('/comments');
        expect(res.status).toBe(200);
        expect(res.body.comments).toBeInstanceOf(Array);
    });

    // Test updating a comment
    it('should update a comment', async () => {
        const res = await request(app)
            .put(`/comments/${commentId}`)
            .send(updatedComment);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Comment updated successfully');
        expect(res.body.data.comment).toBe(updatedComment.comment);
    });

    // Test deleting a comment
    it('should delete a comment', async () => {
        const res = await request(app).delete(`/comments/${commentId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Comment deleted successfully');
    });

    it('should return 404 when trying to delete a non-existent comment', async () => {
        const res = await request(app).delete(`/comments/${commentId}`);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Comment not found');
    });
});
