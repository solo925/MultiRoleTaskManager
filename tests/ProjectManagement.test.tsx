
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectManagement from '../client/src/pages/ProjectManagement'; 

describe('ProjectManagement Component', () => {
    beforeEach(() => {
        render(<ProjectManagement />);
    });

    test('renders Project Management heading', () => {
        const heading = screen.getByText(/project management/i);
        expect(heading).toBeInTheDocument();
    });

    test('displays project form when showProjectForm is true', () => {
       
        const projectNameInput = screen.getByLabelText(/project name/i);
        expect(projectNameInput).toBeInTheDocument();
    });

    test('handles input changes', () => {
      
        const projectNameInput = screen.getByLabelText(/project name/i) as HTMLInputElement;
        
        fireEvent.change(projectNameInput, { target: { value: 'New Project' } });
        
        expect(projectNameInput.value).toBe('New Project');
    });
});
