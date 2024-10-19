// import { users } from "../db/dbFaker";
import { users } from "../db/testUserdb";

const findUserByEmail = (email: string) => {
    if (users.length > 0) {
        // use xata after testing on dummy data
        const foundUserEmail = users.find(user => user.email === email)
        console.log(foundUserEmail)
        return foundUserEmail
    } else {
        throw new Error('email not found')
    }
}

export { findUserByEmail };
