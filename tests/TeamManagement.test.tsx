// TeamManagement.test.tsx

import React from 'react'; // Import React
import { render, screen, fireEvent } from '@testing-library/react';
import TeamManagement from '../client/src/pages/TeamManagement'; 
import Button from '../client/src/components/Button'; 

// Mock the Button component
jest.mock('../components/Button', () => {
  return jest.fn(({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  ));
});

describe('TeamManagement Component', () => {
  const setup = () => {
    render(<TeamManagement />);
  };

  test('renders TeamManagement component', () => {
    setup();
    expect(screen.getByText(/Manage your teams here/i)).toBeInTheDocument();
    expect(screen.queryByText(/Create a new Team/i)).not.toBeInTheDocument(); // Form should not be visible initially
  });

  test('toggles the team form visibility', () => {
    setup();
    
    // Check that the form is not displayed initially
    expect(screen.queryByText(/Create a new Team/i)).not.toBeInTheDocument();

    // Click the Create Team button to show the form
    const createTeamButton = screen.getByRole('button', { name: /Create Team/i });
    fireEvent.click(createTeamButton);

    // Check that the form is now displayed
    expect(screen.getByText(/Create a new Team/i)).toBeInTheDocument();
  });

  test('fills out the form and submits', () => {
    setup();
    // Show the team form
    const createTeamButton = screen.getByRole('button', { name: /Create Team/i });
    fireEvent.click(createTeamButton);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/TeamID/i), {
      target: { value: 'team123' },
    });
    fireEvent.change(screen.getByLabelText(/Team Name/i), {
      target: { value: 'Awesome Team' },
    });
    fireEvent.change(screen.getByLabelText(/Team Description/i), {
      target: { value: 'This team is awesome!' },
    });

    // Fill Admin ID
    fireEvent.change(screen.getByLabelText(/Admin ID/i), {
      target: { value: 'admin123' },
    });

    // Submit the form (Button click)
    fireEvent.click(screen.getByText(/Create Team/i));

    // Here you would typically assert that the submitted data is handled correctly
    // Since submitData is currently empty, you can either spy on it if it were defined
  });

  test('handles input changes', () => {
    setup();
    const createTeamButton = screen.getByRole('button', { name: /Create Team/i });
    fireEvent.click(createTeamButton);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/TeamID/i), {
      target: { value: 'team123' },
    });
    fireEvent.change(screen.getByLabelText(/Team Name/i), {
      target: { value: 'Awesome Team' },
    });
    fireEvent.change(screen.getByLabelText(/Team Description/i), {
      target: { value: 'This team is awesome!' },
    });
    fireEvent.change(screen.getByLabelText(/Admin ID/i), {
      target: { value: 'admin123' },
    });

    // Verify the values are set correctly
    expect((screen.getByLabelText(/TeamID/i) as HTMLInputElement).value).toBe('team123');
    expect((screen.getByLabelText(/Team Name/i) as HTMLInputElement).value).toBe('Awesome Team');
    expect((screen.getByLabelText(/Team Description/i) as HTMLTextAreaElement).value).toBe('This team is awesome!');
    expect((screen.getByLabelText(/Admin ID/i) as HTMLInputElement).value).toBe('admin123');
  });
});
