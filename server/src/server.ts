import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import app from './app';

dotenv.config();

// app.use(cookieParser(process.env.JWT_SECRET_KEY || 'fallback-secret'));

app.use(cookieParser('da82114264c9d2644f1ce6f13863a7c91105cc1c79fa9187627bb8c54e46b775bac6d972ff4290b118ac2cd05c683953d1c998a0effe8503972c860d9393039ac806792a59ddfa8f08a2681c2305f2fd78199ae0c03d56057ab3689b49d070af8bf40dab739e912fa27e3905621c1d9fab51a3761fa7675093eca60859289c14'));

app.get("/", async (req: Request, res: Response) => {
    // Generate a secure random string for ACCESS_TOKEN_SECRET
    const accessTokenSecret = crypto.randomBytes(64).toString("hex");

    // Generate a secure random string for REFRESH_TOKEN_SECRET
    const refreshTokenSecret = crypto.randomBytes(64).toString("hex");
    const jwtSecret = crypto.randomBytes(64).toString("hex");

    console.log("ACCESS_TOKEN_SECRET:", accessTokenSecret);
    console.log("REFRESH_TOKEN_SECRET:", refreshTokenSecret);
    console.log("JWT_SECRET:", jwtSecret);
    console.log(req.headers);

    const salt = 10;
    const hash = await bcrypt.hashSync("passwordToBeHashed", salt);

    // Log signed cookies to the console
    console.log('Signed Cookies:', req.signedCookies); // This should show signed cookies

    // Send the JSON response to the client
    res.json({
        message: "Working well",
        hash: hash,
        ACCESS_TOKEN: accessTokenSecret,
        REFRESH_TOKEN: refreshTokenSecret,
        JWT_SECRET: jwtSecret
    });
});








const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
