// export interface Comment {
//     id: string;
//     content: string;
//     taskId: string;  // Foreign key to Task
//     userId: string;  // Foreign key to User
// }
export interface Comments {
    id: string;
    content: string;
    taskId: string;
    userId: string;
}

const comments: Comments[] = [
    { id: '1', content: 'This is a test comment', taskId: '101', userId: '1' },
    { id: '2', content: 'Another comment for testing', taskId: '102', userId: '2' },
];

