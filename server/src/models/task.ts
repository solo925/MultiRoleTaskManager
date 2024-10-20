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

export const tasks: Task[] = [
    { id: '1', description: 'Task 1', status: 'in-progress', dueDate: '2022-01-01', projectId: '1', assignedToId: '1' },
    { id: '2', description: 'Task 2', status: 'completed', dueDate: '2022-02-15', projectId: '2', assignedToId: '2' },
    { id: '3', description: 'Task 3', status: 'pending', dueDate: '2022-03-10', projectId: '3', assignedToId: '1' },
    { id: '4', description: 'Task 4', status: 'in-progress', dueDate: '2022-04-05', projectId: '1', assignedToId: '3' },
    { id: '5', description: 'Task 5', status: 'completed', dueDate: '2022-05-20', projectId: '2', assignedToId: '2' },
];
