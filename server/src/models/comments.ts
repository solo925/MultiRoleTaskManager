export interface Comment {
    id: string;
    content: string;
    taskId: string;  // Foreign key to Task
    userId: string;  // Foreign key to User
}
