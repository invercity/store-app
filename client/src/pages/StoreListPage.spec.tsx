import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StoreListPage from './StoreListPage';
import { storeApi } from '../api';
import { vi, expect, it, describe, beforeEach } from 'vitest';

// Mock the API
vi.mock('../api', () => ({
    storeApi: {
        getAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        remove: vi.fn(),
    },
}));

describe('StoreListPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders store list correctly', async () => {
        const mockStores = [
            { id: '1', name: 'Store 1', address: 'Addr 1', createdAt: new Date().toISOString() },
            { id: '2', name: 'Store 2', address: 'Addr 2', createdAt: new Date().toISOString() },
        ];
        (storeApi.getAll as any).mockResolvedValue(mockStores);

        render(
            <BrowserRouter>
                <StoreListPage />
            </BrowserRouter>,
        );

        expect(screen.getByText(/stores/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Store 1')).toBeInTheDocument();
            expect(screen.getByText('Store 2')).toBeInTheDocument();
        });
    });
});
