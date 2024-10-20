// utils/taskUtils.ts
import { Task, tasks } from '../models/task';

// Function to get a task by ID
export const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
};

// Function to update a task
export const updateTaskById = (id: string, updatedData: Partial<Task>): Task | undefined => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
        return tasks[taskIndex];
    }
    return undefined;
};

// Function to delete a task
export const deleteTaskById = (id: string): boolean => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task from the array
        return true;
    }
    return false;
};
