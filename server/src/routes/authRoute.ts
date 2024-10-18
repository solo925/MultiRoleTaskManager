
import express from 'express';
import { loginController as login, registerController as register } from '../controllers/authController/authController';
import logOutController from '../controllers/authController/logoutController';

const loginRoute = express.Router();
const registerRoute = express.Router();
const logoutRoute = express.Router();

registerRoute.use('/register', register)
loginRoute.use('/login', login)
logoutRoute.use('/logout', logOutController)

export { loginRoute, logoutRoute, registerRoute };

