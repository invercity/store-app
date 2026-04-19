import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { expect, it, describe } from 'vitest';

describe('NotFoundPage', () => {
    it('renders 404 message and home button', () => {
        render(
            <BrowserRouter>
                <NotFoundPage />
            </BrowserRouter>,
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /go to home/i })).toBeInTheDocument();
    });
});
