import { users } from "../db/testUserdb";
const findUserByUserName = async (name: string) => {
    if (users.length > 0) {
        const foundUserName = await users.find(user => user.name === name)
        return foundUserName
    } else {
        throw new Error('User name not found')
    }
}

export { findUserByUserName };
