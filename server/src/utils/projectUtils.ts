// utils/projectUtils.ts
import { Project, projects } from '../models/project';

// Function to get a project by ID
export const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
};

// Function to update a project
export const updateProjectById = (id: string, updatedData: Partial<Project>): Project | undefined => {
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
        projects[projectIndex] = { ...projects[projectIndex], ...updatedData };
        return projects[projectIndex];
    }
    return undefined;
};

// Function to delete a project
export const deleteProjectById = (id: string): boolean => {
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
        projects.splice(projectIndex, 1); // Remove the project from the array
        return true;
    }
    return false;
};
