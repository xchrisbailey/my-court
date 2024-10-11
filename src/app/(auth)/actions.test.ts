import { lucia, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';
import { describe, expect, it, Mock, vi } from 'vitest';
import { logout } from './actions';

vi.mock('@/lib/auth', () => ({
  validateRequest: vi.fn(),
  lucia: {
    invalidateSession: vi.fn(),
    createBlankSessionCookie: vi.fn(),
  },
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
  })),
}));

describe('logout', () => {
  it('should return an error if no session is found', async () => {
    (validateRequest as Mock).mockResolvedValue({ session: null });

    const result = await logout();

    expect(result).toEqual({ error: 'Unauthorized' });
  });

  it('should invalidate the session and return success message', async () => {
    const mockSession = { id: 'session-id' };
    (validateRequest as Mock).mockResolvedValue({ session: mockSession });
    (lucia.invalidateSession as Mock).mockResolvedValue(undefined);
    const mockSetCookie = vi.fn();
    (cookies as Mock).mockReturnValue({ set: mockSetCookie });
    const mockBlankSessionCookie = {
      name: 'session',
      value: '',
      attributes: {},
    };
    (lucia.createBlankSessionCookie as Mock).mockReturnValue(
      mockBlankSessionCookie,
    );

    const result = await logout();

    expect(lucia.invalidateSession).toHaveBeenCalledWith(mockSession.id);
    expect(mockSetCookie).toHaveBeenCalledWith(
      mockBlankSessionCookie.name,
      mockBlankSessionCookie.value,
      mockBlankSessionCookie.attributes,
    );
    expect(result).toEqual({ success: 'logged out successfully' });
  });
});
