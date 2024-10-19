import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface tokenTypes extends Request {
    status: number;
    user: any;
}

export const authenticateUser = (req: tokenTypes, res: Response, next: NextFunction) => {
    const token = req.cookies['token-Cookie']; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify the token with the secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded; // Attach the decoded token data (like userId) to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
