import request from 'supertest';
import express from 'express';
import { createProject } from '../server/src/controllers/projectController/projectController'; // Adjust this path
import { getXataClient } from '../server/src/xata'; 

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/projects', createProject); // Mount the router

// Mock the Xata client
jest.mock('../../xata', () => ({
    getXataClient: jest.fn().mockReturnValue({
        sql: jest.fn(),
    }),
}));

const xataMock = getXataClient();

describe('Project API', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('POST /api/projects', () => {
        it('should create a new project successfully', async () => {
            const projectName = 'New Project';

            // Mock the SQL queries
            xataMock.sql.mockResolvedValueOnce({ records: [] }) // No existing project
                .mockResolvedValueOnce({ records: [{ name: projectName }] }) // Project creation
                .mockResolvedValueOnce({ records: [{ name: projectName, teamId: 'id-00285243' }] }); // Retrieve project

            const response = await request(app).post('/api/projects').send({ name: projectName });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Project created successfully!');
            expect(response.body.data.name).toBe(projectName);
        });

        it('should return 400 if name is not provided', async () => {
            const response = await request(app).post('/api/projects').send({});
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Name is required!');
        });

        it('should return 409 if project name already exists', async () => {
            const projectName = 'Existing Project';

            // Mock the SQL queries
            xataMock.sql.mockResolvedValueOnce({ records: [{ name: projectName }] }); // Existing project

            const response = await request(app).post('/api/projects').send({ name: projectName });
            expect(response.status).toBe(409);
            expect(response.body.error).toBe('A project with this name already exists.');
        });
    });

    describe('GET /api/projects', () => {
        it('should retrieve all projects', async () => {
            // Mock the SQL query
            xataMock.sql.mockResolvedValueOnce({ records: [{ name: 'Project 1' }, { name: 'Project 2' }] });

            const response = await request(app).get('/api/projects');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Projects retrieved successfully!');
            expect(response.body.data.length).toBe(2);
        });
    });

    describe('GET /api/projects/:projectId', () => {
        it('should retrieve a project by ID', async () => {
            const projectId = 'some-project-id';
            const projectName = 'Project 1';

            // Mock the SQL query
            xataMock.sql.mockResolvedValueOnce({ records: [{ xata_id: projectId, name: projectName }] });

            const response = await request(app).get(`/api/projects/${projectId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Project retrieved successfully!');
            expect(response.body.data.name).toBe(projectName);
        });

        it('should return 404 if project is not found', async () => {
            const projectId = 'non-existent-id';

            // Mock the SQL query
            xataMock.sql.mockResolvedValueOnce({ records: [] });

            const response = await request(app).get(`/api/projects/${projectId}`);
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Project not found!');
        });
    });

    describe('PUT /api/projects/:projectId', () => {
        it('should update a project by ID', async () => {
            const projectId = 'some-project-id';
            const updatedName = 'Updated Project';

            // Mock the SQL queries
            xataMock.sql.mockResolvedValueOnce({ records: [{ xata_id: projectId }] }) // Existing project
                .mockResolvedValueOnce({ records: [{ name: updatedName }] }); // Update project

            const response = await request(app).put(`/api/projects/${projectId}`).send({ name: updatedName });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Project updated successfully!');
            expect(response.body.data.name).toBe(updatedName);
        });

        it('should return 404 if project to update is not found', async () => {
            const projectId = 'non-existent-id';

            // Mock the SQL query
            xataMock.sql.mockResolvedValueOnce({ records: [] });

            const response = await request(app).put(`/api/projects/${projectId}`).send({ name: 'New Name' });
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Project not found!');
        });
    });

    describe('DELETE /api/projects/:projectId', () => {
        it('should delete a project by ID', async () => {
            const projectId = 'some-project-id';

            // Mock the SQL query
            xataMock.sql.mockResolvedValueOnce({ records: [{ xata_id: projectId }] }) // Existing project
                .mockResolvedValueOnce({ records: [] }); // Delete project

            const response = await request(app).delete(`/api/projects/${projectId}`);
            expect(response.status).toBe(204);
            expect(response.body.message).toBeUndefined();
        });

        it('should return 404 if project to delete is not found', async () => {
            const projectId = 'non-existent-id';

            // Mock the SQL query
            xataMock.sql.mockResolvedValueOnce({ records: [] });

            const response = await request(app).delete(`/api/projects/${projectId}`);
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Project not found!');
        });
    });
});
