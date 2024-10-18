import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { getXataClient } from '../../db/db';
import { users } from '../../db/testUserdb';
import { User } from '../../models/user';
import { usersType } from '../../types/usersTypes';
import { findUserByUserName } from '../../utils/getUseByName';
import { findUserByEmail } from '../../utils/getUserByEmail';

const xata = getXataClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'jwt';

const authRouter = Router();

// Register route
authRouter.post('/register', async (req: Request<{}, {}, usersType>, res: Response) => {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const findUser = await findUserByUserName(name);
    if (findUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role,
    };

    users.push(newUser); // This can be replaced with an actual DB insert if needed
    // await xata.db.User.create(newUser); // Uncomment and use this for database interaction

    return res.status(201).json({ message: 'User registered successfully' });
});

// Login route
authRouter.post('/login', async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
    const { email, password } = req.body;

    // Fetch the user by email
    const user = findUserByEmail(email); // Replace this with the actual query
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.json({ token });
});

export default authRouter;
