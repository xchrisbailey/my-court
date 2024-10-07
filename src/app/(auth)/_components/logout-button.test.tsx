import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, expect, it, Mock, vi } from 'vitest';
import { logout } from '../actions';
import { LogoutButton } from './logout-button';

// Mock the necessary modules
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../actions', () => ({
  logout: vi.fn(),
}));

describe('LogoutButton', () => {
  it('renders the logout button', () => {
    render(<LogoutButton />);
    const button = screen.getByText('logout');
    expect(button).toBeInTheDocument();
  });

  it('calls logout and redirects on button click', async () => {
    const push = vi.fn();
    (useRouter as Mock).mockReturnValue({ push });

    render(<LogoutButton />);
    const button = screen.getByText('logout');

    fireEvent.click(button);

    // Wait for the async function to complete
    await new Promise(process.nextTick);

    expect(logout).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/');
  });
});
