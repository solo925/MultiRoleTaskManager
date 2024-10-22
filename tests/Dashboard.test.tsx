import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../client/src/pages/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Dashboard Component', () => {
    beforeEach(() => {
        render(
            <Router>
                <Dashboard />
            </Router>
        );
    });

    test('renders the home link', () => {
        const homeLink = screen.getByText(/home/i);
        expect(homeLink).toBeInTheDocument();
    });

    test('renders the View Tasks link', () => {
        const viewTasksLink = screen.getByText(/view tasks/i);
        expect(viewTasksLink).toBeInTheDocument();
    });

    test('invoking the invite modal on clicking "Invite Member"', () => {
        const inviteMemberButton = screen.getByText(/invite member/i);
        fireEvent.click(inviteMemberButton);
        
        const inviteModal = screen.getByText(/invite user/i);
        expect(inviteModal).toBeInTheDocument();
    });

    test('invoking the logout modal on clicking "Logout"', () => {
        const logoutButton = screen.getByText(/logout/i);
        fireEvent.click(logoutButton);
        
        const logoutModal = screen.getByText(/we see that you leaving/i);
        expect(logoutModal).toBeInTheDocument();
    });

    test('canceling logout should close the modal', () => {
        // Open the logout modal
        fireEvent.click(screen.getByText(/logout/i));
        
        // Click the cancel button
        fireEvent.click(screen.getByText(/cancel/i));
        
        // Check that the modal is no longer in the document
        const logoutModal = screen.queryByText(/we see that you leaving/i);
        expect(logoutModal).not.toBeInTheDocument();
    });
});
