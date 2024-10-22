import request from 'supertest';
import express from 'express';
import logOutController from '../server/src/controllers/authController/logoutController'; 

// Create an instance of the express app for testing
const app = express();

// Use the logOutController router in the app
app.use(logOutController);

describe('GET /logout', () => {
  it('should clear the token cookie and redirect to /login', async () => {
    const response = await request(app).get('/logout');

    // Check if the response sets the 'token' cookie to an empty string
    expect(response.headers['set-cookie'][0]).toContain('token=;');
    
    // Check if the response redirects to the login page
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/login');
  });
});
