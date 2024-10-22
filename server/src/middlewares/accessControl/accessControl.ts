import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request interface to include custom fields
export interface CustomRequest1 extends Request {
    user?: {
        xata_id: string;
    };
}

// Middleware to authenticate token and decode user ID
const authenticateToken: any = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        // Attach user ID to the request object
        (req as CustomRequest1).user = { xata_id: decoded.id }; // Type assertion here
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token is not valid' });
    }
};

export default authenticateToken;


// import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// // Extend Request interface to include custom fields
// export interface CustomRequest1 extends Request {
//     user?: {
//         xata_id: string;
//         isAdmin?: boolean;
//     };
// }

// // Middleware to authenticate token and optionally check admin status
// const authenticateToken: any = (requireAdmin: boolean = false) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers.authorization; // Bearer <token>

//         if (!token) {
//             return res.status(401).json({ message: 'No token provided, authorization denied' });
//         }

//         try {
//             // Verify the token and decode it
//             const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { xata_id: string, isAdmin: boolean };

//             // Attach user ID and admin status to the request object
//             (req as CustomRequest1).user = { xata_id: decoded.xata_id, isAdmin: decoded.isAdmin };

//             // If admin access is required, check if the user is an admin
//             if (requireAdmin && !decoded.isAdmin) {
//                 return res.status(403).json({ message: 'Admin access required' });
//             }

//             next();
//         } catch (err) {
//             return res.status(403).json({ message: 'Token is not valid' });
//         }
//     };
// };

// export default authenticateToken;
