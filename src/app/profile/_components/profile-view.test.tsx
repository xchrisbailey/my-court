import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock the `notFound` function from 'next/navigation'
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

import { ProfileView } from '@/app/profile/_components/profile-view';
import { notFound as mockNotFound } from 'next/navigation';

describe('ProfileView', () => {
  it('renders user information correctly', async () => {
    const mockUser = {
      id: '1',
      email: 'chris.bailey@example.com',
      password: 'password123',
      name: 'Chris Bailey',
      matches: [],
      practices: [],
      gearSets: [],
    };

    const userPromise = Promise.resolve(mockUser);

    render(<ProfileView userPromise={userPromise} />);

    await waitFor(() => {
      expect(screen.getByText('Chris Bailey')).toBeInTheDocument();
    });
  });

  it('calls notFound when user is undefined', async () => {
    const userPromise = Promise.resolve(undefined);

    render(<ProfileView userPromise={userPromise} />);

    await waitFor(() => {
      expect(mockNotFound).toHaveBeenCalled();
    });
  });
});
