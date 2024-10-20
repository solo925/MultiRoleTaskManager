import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request interface to include custom fields
export interface CustomRequest1 extends Request {
    user?: {
        id: string;
    };
}

// Middleware to authenticate token and decode user ID
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        // Attach user ID to the request object
        (req as CustomRequest1).user = { id: decoded.id }; // Type assertion here
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token is not valid' });
    }
};

export default authenticateToken;