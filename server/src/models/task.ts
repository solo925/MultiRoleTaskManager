// export interface Task {
//     id: string;
//     description: string;
//     status: 'in-progress' | 'completed';
//     dueDate: Date;
//     projectId: string;    // Foreign key to Project
//     assignedToId: string; // Foreign key to User
// }

// models/task.ts
export interface Task {
    id: string;
    description: string;
    status: string;
    dueDate: string;
    projectId: string;
    assignedToId: string;
}

export const tasks: Task[] = [];
