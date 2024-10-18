import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { RegisterRequestBodyType } from "../../types/RegisterTypes";

//make sure all your controllers, middleware, dbcalls, etc are asynchronous 
//to make sure something is awaited before another happens
const hashPasswordMiddleware = async (req: Request<{}, {}, RegisterRequestBodyType>, res: Response, next: NextFunction) => {
    //to add types to the request body, create a types files
    const { password, confirmPassword } = req.body

    //validate that password and confirmPassword are passed
    if (!password || !confirmPassword) {
        res.status(400).json({ message: 'Password and Confirm Password are required' })
    } else if (password !== confirmPassword) {
        res.status(400).json({ message: 'Password do not match' })
    } else {
        try {
            //hash the password and confirm password
            //hashSync - Synchronously generates a hash for the given string.
            // @param s — String to hash
            // @param salt — Salt length to generate or salt to use, default to 10
            // @return — Resulting hash
            const hashedPassword = await bcrypt.hashSync(password, 10)
            //replaced the passwords from the incoming body with the hashed ones 
            req.body.password = hashedPassword
            req.body.confirmPassword = hashedPassword
            //move to the next middles
            next()
        } catch (error) {
            res.status(500).json({ message: 'Error hashing passwords' })
        }
    }
}

export { hashPasswordMiddleware };
