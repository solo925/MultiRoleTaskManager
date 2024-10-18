import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import { getXataClient } from '../../db/db';
import { users } from '../../db/testUserdb';
import { User } from '../../models/user';
import { usersType } from '../../types/usersTypes';
import { findUserByUserName } from '../../utils/getUseByName';

const xata = getXataClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'jwt';

const registerRouter = Router();

// Register route
registerRouter.post('/register', async (req: Request<{}, {}, usersType>, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const findUser = await findUserByUserName(name);
    if (findUser) {
        res.status(400).json({ message: 'Username already taken' });
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

    res.status(201).json({ message: 'User registered successfully' });
});
