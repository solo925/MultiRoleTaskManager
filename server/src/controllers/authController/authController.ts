import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { getXataClient } from '../../xata'; // Import Xata Client

dotenv.config();

export const RegisterController: Router = express.Router();
export const loginController: Router = express.Router();

// Register Route
RegisterController.post('/', async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const xata = getXataClient(); // Initialize Xata client

    try {
        // Check if the user already exists by email
        const existingUser = await xata.db.users.filter({ email }).getFirst();
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const latestUser = await xata.db.users
            .sort('ID', 'desc')
            .getFirst(); // Get the user with the highest ID

        let newId: number;

        if (latestUser && latestUser.ID) {
            // Increment the last ID
            newId = latestUser.ID + 1;
        } else {
            // If no users exist yet, start with ID 1
            newId = 1;
        }

        // Now create the new user with the incremented ID
        const newUser = await xata.db.users.create({
            ID: newId, // Use the new incremented ID
            name,
            email,
            password: hashedPassword,
            role: ['TeamMember'], // Default role
        });

        // Generate a JWT token
        const token = jwt.sign({ id: newUser.xata_id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.status(201).json({ token, message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login Route
loginController.post('/', async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const xata = getXataClient();

    try {
        // Fetch the user from Xata by email
        const user = await xata.db.users.filter({ email }).getFirst();
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.xata_id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default { loginController, RegisterController };










// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import express, { Request, Response, Router } from 'express';
// import jwt from 'jsonwebtoken';
// // import users  from '../../db/testUserdb';
// import User from '../../models/user';
// import { usersType } from '../../types/usersTypes';
// import { findUserByUserName } from '../../utils/getUseByName';
// import { findUserByEmail } from '../../utils/getUserByEmail';
// import { getXataClient } from '../../xata';

// dotenv.config()


// const xata = getXataClient();
// const JWT_SECRET = process.env.JWT_SECRET;

// // Use the token generation utility

// const loginController = express.Router();
// const registerController = Router();

// // Register route
// registerController.post('/', async (req: Request<{}, {}, usersType>, res: Response): Promise<void> => {
//     const { name, email, password, role } = req.body;

//     // Check if the user already exists
//     const findUser = await findUserByUserName(name);
//     if (findUser) {
//         res.status(400).json({ message: 'Username already taken' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user

//     const newUser: User = {
//         id: Date.now().toString(),
//         name,
//         email,
//         password: hashedPassword,
//         role,
//     };

//     // const newUser = {
//     //     id: Date.now().toString(),
//     //     name,
//     //     email,
//     //     password: hashedPassword,
//     //     role,

//     // }


//     await xata.db.users.create(newUser);
//     users.push(newUser);

//     res.status(201).json({ message: 'User registered successfully' });
// });

// // Login route



// loginController.post("/", async (req: Request, res: Response): Promise<any> => {
//     const { email, password } = req.body;

//     try {
//         const userFound = await findUserByEmail(email);

//         if (!userFound || userFound === undefined) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         // const isPasswordValid = await bcrypt.compare(password, userFound.password);
//         // if (!isPasswordValid) {
//         //     return res.status(401).json({ message: "Invalid credentials" });
//         // }

//         // Generate the JWT token with an expiration time
//         const expirationTime = process.env.JWT_EXPIRATION as string;

//         const token = jwt.sign(
//             { userId: userFound.id, email: userFound.email },
//             process.env.JWT_SECRET as string,
//             { expiresIn: expirationTime }
//         );

//         // Set token as a signed cookie
//         res.cookie("token-Cookie", token, {
//             httpOnly: true,  // Protect the cookie from being accessed by JavaScript
//             signed: true,    // Enable signed cookies (now working with cookie-parser)
//             maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//         });

//         res.status(200).json({
//             message: "Login successful",
//             accessToken: token
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });



// // loginController.post(
// //     "/",
// //     async (req: Request, res: Response): Promise<void> => {
// //         const { email, password } = req.body;


// //         try {
// //             // Find the user in the database
// //             const userFound = await findUserByEmail(email);

// //             if (userFound === undefined || !userFound) {
// //                 // Return 401 if the user is not found
// //                 res.status(401).json({ message: "Invalid credentials" });
// //             }// } else {
// //             // const isPasswordValid = await bcrypt.compare(
// //             //     password,
// //             //     userFound.password
// //             // );

// //             else if (password !== userFound.password) {
// //                 // Return 401 if the password doesn't match
// //                 res.status(401).json({ message: "Invalid credentials" });
// //             } else {
// //                 res.status(200).json({ message: 'login successful' });

// //             }

// //             //     const { accessToken, refreshToken } = generateTokenUtil(userFound.id);

// //             //     // Store the access token in signed cookies
// //             //     res.cookie("token-Cookie", accessToken, {
// //             //         httpOnly: true, // Prevents JavaScript access to the cookie (helps against XSS)
// //             //         signed: true,   // Ensures the cookie is signed
// //             //         maxAge: 24 * 60 * 60 * 1000, // Token expiry in 1 day
// //             //     });

// //             //     // Respond with the tokens and success message
// //             //     res.status(200).json({
// //             //         message: "Successful login",
// //             //         accessToken,
// //             //         refreshToken,
// //             //     });



// //             // if (!isPasswordValid) {
// //             //     // Return 401 if the password doesn't match
// //             //     res.status(401).json({ message: "Invalid credentials" });
// //             // }

// //             //     const { accessToken, refreshToken } = generateTokenUtil(userFound.id);

// //             //     // Store the access token in signed cookies
// //             //     res.cookie("token-Cookie", accessToken, {
// //             //         httpOnly: true, // Prevents JavaScript access to the cookie (helps against XSS)
// //             //         signed: true,   // Ensures the cookie is signed
// //             //         maxAge: 24 * 60 * 60 * 1000, // Token expiry in 1 day
// //             //     });

// //             //     // Respond with the tokens and success message
// //             //     res.status(200).json({
// //             //         message: "Successful login",
// //             //         accessToken,
// //             //         refreshToken,
// //             //     });
// //             // }

// //             // Generate access and refresh tokens using the utility functi
// //         } catch (error) {
// //             // Handle unexpected errors
// //             console.error(error);
// //             res.status(500).json({ message: "Internal server error" });
// //         }
// //     }
// // );


// export { loginController, registerController };

