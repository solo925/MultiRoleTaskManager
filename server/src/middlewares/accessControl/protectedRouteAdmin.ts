import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to restrict routes to admin users only
export const adminOnly = (req: Request, res: Response, next: NextFunction): any => {
    try {
        // Get token from request headers (Authorization: Bearer <token>)
        const token = req.headers.authorization?.split(' ')[1];

        // If no token is provided, deny access
        if (!token || token === 'null') {
            res.status(401).json({ message: 'No token provided, access denied' });
        }

        // Ensure that JWT_SECRET is defined
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'JWT Secret not configured' });
        }

        // Verify the token, ensuring that token is a string
        const decodedToken = jwt.verify(token as string, secret);

        // Extract the user's role from the decoded token
        const { role } = decodedToken as { id: string; role: string[] };

        // Check if the user's role includes 'admin'
        if (!role.includes('Admin')) {
            return res.status(403).json({ message: 'Access denied. Admins only' });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails or other errors occur, deny access
        return res.status(403).json({ message: 'Invalid token or access denied' });
    }
};
