import bcrypt from 'bcryptjs';
import express, { Request, Response, Router } from 'express';
import { getXataClient } from '../../db/db';
import { users } from '../../db/testUserdb';
import { User } from '../../models/user';
import { usersType } from '../../types/usersTypes';
import { generateTokenUtil } from "../../utils/generateTokens";
import { findUserByUserName } from '../../utils/getUseByName';
import { findUserByEmail } from '../../utils/getUserByEmail';

const xata = getXataClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'jwt';

// Use the token generation utility

const loginController = express.Router();
const registerController = Router();

// Register route
registerController.post('/register', async (req: Request<{}, {}, usersType>, res: Response): Promise<void> => {
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

// Login route



loginController.post(
    "/",
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            // Find the user in the database
            const userFound = await findUserByEmail(email);

            if (userFound === undefined || !userFound) {
                // Return 401 if the user is not found
                res.status(401).json({ message: "Invalid credentials" });
            } else {
                const isPasswordValid = await bcrypt.compare(
                    password,
                    userFound.password
                );

                if (!isPasswordValid) {
                    // Return 401 if the password doesn't match
                    res.status(401).json({ message: "Invalid credentials" });
                }

                const { accessToken, refreshToken } = generateTokenUtil(userFound.id);

                // Store the access token in signed cookies
                res.cookie("token-Cookie", accessToken, {
                    httpOnly: true, // Prevents JavaScript access to the cookie (helps against XSS)
                    signed: true,   // Ensures the cookie is signed
                    maxAge: 24 * 60 * 60 * 1000, // Token expiry in 1 day
                });

                // Respond with the tokens and success message
                res.status(200).json({
                    message: "Successful login",
                    accessToken,
                    refreshToken,
                });
            }

            // Generate access and refresh tokens using the utility functi
        } catch (error) {
            // Handle unexpected errors
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);


export { loginController, registerController };

