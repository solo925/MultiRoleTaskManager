import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()


const generateTokenUtil = (userId: string) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error("Missing ACCESS_TOKEN_SECRET or  REFRESH_TOKEN_SECRET from the environments variables ")
    } else {
        //access the tokens and sign them and retun them 
        //sign() - Synchronously sign the given payload into a JSON Web Token string payload - Payload to sign, could be an literal, buffer or string secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA. [options] - Options for the signature returns - The JSON Web Token string
        const accessToken = jwt.sign({ userId }, accessTokenSecret, {
            expiresIn: "15m"
        })

        const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
            expiresIn: "7d"
        })

        return { accessToken, refreshToken }
    }
}

export { generateTokenUtil };

