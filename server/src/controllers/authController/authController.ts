import bcrypt from 'bcryptjs';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
// import { xata } from '../../db/db';
import { getXataClient } from '../../db/db';
import { User } from '../../models/user';
import { CustomeRequest } from '../../types/CustomeReuest';

const xata = getXataClient();

const JWT_SECRET = 'your_jwt_secret_key';

export const register = async (req: CustomeRequest, res: Response) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role
    };

    await xata.db.User.create(newUser); //replace with our ta ble Name
    res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: CustomeRequest, res: Response) => {
    const { email, password } = req.body;

    const user = await xata.db.User.filter({ email }).getFirst(); //same to this
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
