// tests/RegisterAdmin.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterAdmin from '../client/src/pages/ADMIN/RegisterAdmin'; // Adjust the import path as necessary

describe('RegisterAdmin Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <RegisterAdmin />
            </MemoryRouter>
        );
    });

    test('renders Register Admin form', () => {
        const heading = screen.getByText(/register admin/i);
        expect(heading).toBeInTheDocument();
        
        // Check if the input fields and button are rendered
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('allows users to fill in the form and submit', () => {
        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        // Mock console.log
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Check that console.log was called with the correct arguments
        expect(consoleLogSpy).toHaveBeenCalledWith("Registration attempt:", { 
            username: 'testuser', 
            email: 'test@example.com', 
            password: 'password123', 
            role: 'Admin' 
        });

        // Restore original console.log
        consoleLogSpy.mockRestore();
    });

    test('navigates to login page when clicking on login link', () => {
        const loginLink = screen.getByText(/login here/i);
        expect(loginLink).toHaveAttribute('href', '/admin/login');
    });
});
