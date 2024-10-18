import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { getXataClient } from '../../db/db';
import { findUserByEmail } from '../../utils/getUserByEmail';

const xata = getXataClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'jwt';

const loginRouter = Router();

// Login route
loginRouter.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Fetch the user by email
        const user = findUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
});

export default loginRouter;