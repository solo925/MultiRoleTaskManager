import { Request, Response, Router } from "express";
import { getXataClient } from "../../xata";

const userController = Router();
const xata = getXataClient();

userController.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // SQL query to select all comments
        const users = await xata.sql`SELECT * FROM "users"`;

        res.status(200).json({ users: users.records });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
});

export default userController;