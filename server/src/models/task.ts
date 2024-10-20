export interface Task {
    ID: number;  // Changed from `id: string` to match Xata schema
    description: string;
    status: boolean; // Xata uses `bool` for the status
    dueDate: string; // Xata stores datetime as string in ISO format
    projectId: string;    // Foreign key to Project
    assignedToId: string; // Foreign key to User
}

