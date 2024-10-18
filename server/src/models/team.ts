export interface Team {
    id: string;
    name: string;
    description: string;
    adminId: string;  // Foreign key to User
}
