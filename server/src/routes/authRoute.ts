
import express from 'express';
import { register } from "../controllers/authController/authController";

const authRegisterRoute = express.Router();

authRegisterRoute.use('/register', register)

export { authRegisterRoute };
