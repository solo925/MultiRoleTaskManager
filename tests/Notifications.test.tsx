// tests/Notifications.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Notifications from "../client/src/pages/Notifications"

describe('Notifications Component', () => {
    beforeEach(() => {
        render(<Notifications />);
    });

    test('renders Notifications heading', () => {
        const heading = screen.getByText(/notifications/i); // Use case insensitive matching
        expect(heading).toBeInTheDocument();
    });
});
