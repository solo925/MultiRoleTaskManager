// utils/teamUtils.ts
import { Team, teams } from '../models/team';

// Get team by ID
export const getTeamById = (id: string): Team | undefined => {
    return teams.find(team => team.id === id);
};

// Update team by ID
export const updateTeamById = (id: string, updatedData: Partial<Team>): Team | undefined => {
    const teamIndex = teams.findIndex(team => team.id === id);
    if (teamIndex !== -1) {
        teams[teamIndex] = { ...teams[teamIndex], ...updatedData };
        return teams[teamIndex];
    }
    return undefined;
};

// Delete team by ID
export const deleteTeamById = (id: string): boolean => {
    const teamIndex = teams.findIndex(team => team.id === id);
    if (teamIndex !== -1) {
        teams.splice(teamIndex, 1);
        return true;
    }
    return false;
};
