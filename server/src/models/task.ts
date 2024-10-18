export interface Task {
    id: string;
    description: string;
    status: 'in-progress' | 'completed';
    dueDate: Date;
    projectId: string;    // Foreign key to Project
    assignedToId: string; // Foreign key to User
}
