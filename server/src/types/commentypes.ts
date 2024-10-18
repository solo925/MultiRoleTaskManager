type commentType = {
    id: string;
    content: string;
    taskId: string;  // Foreign key to Task
    userId: string;
}

export { commentType };
