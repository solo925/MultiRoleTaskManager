import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { RegisterController, loginController } from '../server/src/controllers/authController/authController';

const app = express();
app.use(bodyParser.json()); 
app.use('/register', RegisterController);
app.use('/login', loginController);

describe('Authentication API', () => {
    describe('POST /register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'password123',
                    confirmPassword: 'password123',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
            expect(response.body.message).toBe('User registered successfully');
        });

        it('should return an error if the user already exists', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'password123',
                    confirmPassword: 'password123',
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });

        it('should return an error if passwords do not match', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    name: 'Test User',
                    email: 'mismatch@example.com',
                    password: 'password123',
                    confirmPassword: 'differentPassword',
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Passwords do not match!');
        });
    });

    describe('POST /login', () => {
        it('should log in an existing user successfully', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.message).toBe('Login successful');
        });

        it('should return an error for invalid credentials', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'wronguser@example.com',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});
