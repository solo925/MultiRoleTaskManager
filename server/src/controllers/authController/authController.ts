import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import express, { Request, Response, Router } from 'express';
import { users } from '../../db/testUserdb';
import { usersType } from '../../types/usersTypes';
import { findUserByUserName } from '../../utils/getUseByName';
import { findUserByEmail } from '../../utils/getUserByEmail';
// import { getXataClient } from '../../xata';
import jwt from 'jsonwebtoken';

dotenv.config()


// const xata = getXataClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Use the token generation utility

const loginController = express.Router();
const registerController = Router();

// Register route
registerController.post('/', async (req: Request<{}, {}, usersType>, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const findUser = await findUserByUserName(name);
    if (findUser) {
        res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user

    // const newUser: User = {
    //     id: Date.now().toString(),
    //     name,
    //     email,
    //     password: hashedPassword,
    //     role,
    // };

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role,

    }


    // await xata.db.users.create(newUser);
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

// Login route



loginController.post("/", async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        const userFound = await findUserByEmail(email);

        if (!userFound || userFound === undefined) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // const isPasswordValid = await bcrypt.compare(password, userFound.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: "Invalid credentials" });
        // }

        // Generate the JWT token with an expiration time
        const expirationTime = process.env.JWT_EXPIRATION as string;

        const token = jwt.sign(
            { userId: userFound.id, email: userFound.email },
            process.env.JWT_SECRET as string,
            { expiresIn: expirationTime }
        );

        // Set token as a signed cookie
        res.cookie("token-Cookie", token, {
            httpOnly: true,  // Protect the cookie from being accessed by JavaScript
            signed: true,    // Enable signed cookies (now working with cookie-parser)
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        });

        res.status(200).json({
            message: "Login successful",
            accessToken: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// loginController.post(
//     "/",
//     async (req: Request, res: Response): Promise<void> => {
//         const { email, password } = req.body;


//         try {
//             // Find the user in the database
//             const userFound = await findUserByEmail(email);

//             if (userFound === undefined || !userFound) {
//                 // Return 401 if the user is not found
//                 res.status(401).json({ message: "Invalid credentials" });
//             }// } else {
//             // const isPasswordValid = await bcrypt.compare(
//             //     password,
//             //     userFound.password
//             // );

//             else if (password !== userFound.password) {
//                 // Return 401 if the password doesn't match
//                 res.status(401).json({ message: "Invalid credentials" });
//             } else {
//                 res.status(200).json({ message: 'login successful' });

//             }

//             //     const { accessToken, refreshToken } = generateTokenUtil(userFound.id);

//             //     // Store the access token in signed cookies
//             //     res.cookie("token-Cookie", accessToken, {
//             //         httpOnly: true, // Prevents JavaScript access to the cookie (helps against XSS)
//             //         signed: true,   // Ensures the cookie is signed
//             //         maxAge: 24 * 60 * 60 * 1000, // Token expiry in 1 day
//             //     });

//             //     // Respond with the tokens and success message
//             //     res.status(200).json({
//             //         message: "Successful login",
//             //         accessToken,
//             //         refreshToken,
//             //     });



//             // if (!isPasswordValid) {
//             //     // Return 401 if the password doesn't match
//             //     res.status(401).json({ message: "Invalid credentials" });
//             // }

//             //     const { accessToken, refreshToken } = generateTokenUtil(userFound.id);

//             //     // Store the access token in signed cookies
//             //     res.cookie("token-Cookie", accessToken, {
//             //         httpOnly: true, // Prevents JavaScript access to the cookie (helps against XSS)
//             //         signed: true,   // Ensures the cookie is signed
//             //         maxAge: 24 * 60 * 60 * 1000, // Token expiry in 1 day
//             //     });

//             //     // Respond with the tokens and success message
//             //     res.status(200).json({
//             //         message: "Successful login",
//             //         accessToken,
//             //         refreshToken,
//             //     });
//             // }

//             // Generate access and refresh tokens using the utility functi
//         } catch (error) {
//             // Handle unexpected errors
//             console.error(error);
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }
// );


export { loginController, registerController };

