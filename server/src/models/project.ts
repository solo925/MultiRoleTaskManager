// export interface Project {
//     id: string;
//     name: string;
//     teamId: string;  // Foreign key to Team
// }

// models/project.ts
export interface Project {
    id: string;
    name: string;
    teamId: string;
}

export const projects: Project[] = [
    { id: '1', name: 'Project Alpha', teamId: 'team1' },
    { id: '2', name: 'Project Beta', teamId: 'team2' },
    { id: '3', name: 'Project Gamma', teamId: 'team1' },
];
