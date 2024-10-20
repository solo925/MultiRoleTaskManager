export interface User {
    ID: number;
    name: string;
    email: string;
    password: string;
    role: 'Admin' | 'TeamMember';
}

export default User
