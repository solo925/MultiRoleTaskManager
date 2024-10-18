
import express from 'express';
import { loginController as login, registerController as register } from '../controllers/authController/authController';

const loginRoute = express.Router();
const registerRoute = express.Router();

registerRoute.use('/register', register)
loginRoute.use('/login', login)

export { loginRoute, registerRoute };

