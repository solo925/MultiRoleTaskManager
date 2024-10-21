// TaskBoard.test.tsx
import React  from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskBoard from '../client/src/pages/TaskBoard';

describe('TaskBoard Component', () => {
  test('renders TaskBoard component with correct headings and filters', () => {
    render(<TaskBoard />);

    expect(screen.getByText(/Filter by status/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter by project/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter by Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter by assignee/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/In-progress/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Completed/i)).toBeInTheDocument();

    // Check for Tasks heading
    expect(screen.getByText(/Tasks/i)).toBeInTheDocument();
  });

  test('renders radio buttons for task status', () => {
    render(<TaskBoard />);

    // Verify radio buttons for "In-progress" and "Completed"
    const inProgressRadio = screen.getByDisplayValue('inProgress');
    const completedRadio = screen.getByDisplayValue('completed');

    expect(inProgressRadio).toBeInTheDocument();
    expect(completedRadio).toBeInTheDocument();
  });

  test('renders empty dynamic sections', () => {
    render(<TaskBoard />);

    // Verify that the dynamic sections are empty for now
    expect(screen.queryByText(/Dynamic content/i)).not.toBeInTheDocument();
  });
});

