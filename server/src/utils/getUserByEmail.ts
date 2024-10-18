// import { users } from "../db/dbFaker";
import { users } from "../db/testUserdb";

const findUserByEmail = (email: string) => {
    if (users.length > 0) {
        const foundUserEmail = users.find(user => user.email === email)
        return foundUserEmail
    } else {
        throw new Error('User name not found')
    }
}

export { findUserByEmail };
