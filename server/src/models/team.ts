// export interface Team {
//     id: string;
//     name: string;
//     description: string;
//     adminId: string;  // Foreign key to User
// }

// models/team.ts
export interface Team {
    id: string;
    name: string;
    description: string;
    adminId: '1';
}

export const teams: Team[] = [
    { id: '1', name: 'Team Alpha', description: 'First team', adminId: '1' },
    { id: '2', name: 'Team Beta', description: 'Second team', adminId: '1' },
];

