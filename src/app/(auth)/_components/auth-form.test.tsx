import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useActionState } from 'react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { AuthForm } from './auth-form';

vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useActionState: vi.fn(),
    forwardRef: actualReact.forwardRef,
  };
});

const mockUseActionState = vi.fn();

describe('AuthForm', () => {
  beforeEach(() => {
    (useActionState as Mock).mockImplementation(mockUseActionState);
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', async () => {
    render(<AuthForm page="login" />);

    await waitFor(() => {});

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders signup form correctly', () => {
    render(<AuthForm page="signup" />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
  });

  it('displays email error message', () => {
    mockUseActionState.mockReturnValueOnce([
      { errors: { email: ['Invalid email'] }, error: '' },
      vi.fn(),
      false,
    ]);

    render(<AuthForm page="login" />);

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('displays password error message', () => {
    mockUseActionState.mockReturnValueOnce([
      { errors: { password: ['Invalid password'] }, error: '' },
      vi.fn(),
      false,
    ]);

    render(<AuthForm page="login" />);

    expect(screen.getByText(/invalid password/i)).toBeInTheDocument();
  });

  it('displays general error message', () => {
    mockUseActionState.mockReturnValueOnce([
      { errors: {}, error: 'Something went wrong' },
      vi.fn(),
      false,
    ]);

    render(<AuthForm page="login" />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('disables button when pending', () => {
    mockUseActionState.mockReturnValueOnce([
      { errors: {}, error: '' },
      vi.fn(),
      true,
    ]);

    render(<AuthForm page="login" />);

    expect(screen.getByRole('button', { name: /loading.../i })).toBeDisabled();
  });

  it('calls action on form submit', () => {
    const mockAction = vi.fn();
    mockUseActionState.mockReturnValueOnce([
      { errors: {}, error: '' },
      mockAction,
      false,
    ]);

    render(<AuthForm page="login" />);

    fireEvent.submit(screen.getByRole('form'));

    expect(mockAction).toHaveBeenCalled();
  });
});
