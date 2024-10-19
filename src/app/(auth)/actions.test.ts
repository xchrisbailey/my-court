// tests/actions.test.ts

import { lucia, validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { hash, verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { login, logout, signup } from './actions';

// Mock modules
vi.mock('@/lib/database');
vi.mock('@/lib/auth');
vi.mock('@node-rs/argon2');
vi.mock('next/headers');
vi.mock('next/navigation');

describe('Auth Functions', () => {
  let mockCookies: { set: Mock };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock cookies() to return an object with a "set" method
    mockCookies = { set: vi.fn() };
    (cookies as Mock).mockReturnValue(mockCookies);

    // Mock redirect function
    (redirect as unknown as Mock).mockImplementation(() => {});
  });

  describe('signup', () => {
    it('should sign up a new user successfully', async () => {
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password123');

      const hashedPassword = 'hashedPassword';

      // Mock hash function
      (hash as Mock).mockResolvedValue(hashedPassword);

      // Mock db.insert().values().returning()
      const mockReturning = vi.fn().mockResolvedValue([{ id: 'userId' }]);
      const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
      (db.insert as Mock).mockReturnValue({ values: mockValues });

      // Mock lucia.createSession
      (lucia.createSession as Mock).mockResolvedValue({ id: 'sessionId' });

      // Mock lucia.createSessionCookie
      (lucia.createSessionCookie as Mock).mockReturnValue({
        name: 'session',
        value: 'sessionValue',
        attributes: {},
      });

      await signup({}, formData);

      expect(redirect).toHaveBeenCalledWith('/');
      expect(mockCookies.set).toHaveBeenCalledWith(
        'session',
        'sessionValue',
        {},
      );
    });

    it('should return error if email already exists', async () => {
      const formData = new FormData();
      formData.append('email', 'duplicate@example.com');
      formData.append('password', 'password123');

      // Mock hash function
      (hash as Mock).mockResolvedValue('hashedPassword');

      // Mock db.insert().values().returning() to throw an error
      const error = new Error('user_email_unique');
      const mockReturning = vi.fn().mockRejectedValue(error);
      const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
      (db.insert as Mock).mockReturnValue({ values: mockValues });

      const result = await signup({}, formData);

      expect(result).toEqual({ error: 'Email already in use' });
    });

    it('should return validation errors for invalid input', async () => {
      const formData = new FormData();
      formData.append('email', 'invalid-email');
      formData.append('password', '123');

      const result = await signup({}, formData);

      expect(result?.errors).toBeDefined();
      expect(result?.error).toBe('invalid email or password');
    });
  });

  describe('login', () => {
    it('should log in an existing user successfully', async () => {
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'password123');

      // Mock db.query.users.findFirst
      (db.query.users.findFirst as Mock).mockResolvedValue({
        id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      // Mock verify function
      (verify as Mock).mockResolvedValue(true);

      // Mock lucia.createSession
      (lucia.createSession as Mock).mockResolvedValue({ id: 'sessionId' });

      // Mock lucia.createSessionCookie
      (lucia.createSessionCookie as Mock).mockReturnValue({
        name: 'session',
        value: 'sessionValue',
        attributes: {},
      });

      await login({}, formData);

      expect(redirect).toHaveBeenCalledWith('/');
      expect(mockCookies.set).toHaveBeenCalledWith(
        'session',
        'sessionValue',
        {},
      );
    });

    it('should return error if user does not exist', async () => {
      const formData = new FormData();
      formData.append('email', 'nonexistent@example.com');
      formData.append('password', 'password123');

      // Mock db.query.users.findFirst to return null
      (db.query.users.findFirst as Mock).mockResolvedValue(null);

      const result = await login({}, formData);

      expect(result).toEqual({ error: 'Incorrect username or password' });
    });

    it('should return error if password is incorrect', async () => {
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'wrongpassword');

      // Mock db.query.users.findFirst
      (db.query.users.findFirst as Mock).mockResolvedValue({
        id: 'userId',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      // Mock verify function to return false
      (verify as Mock).mockResolvedValue(false);

      const result = await login({}, formData);

      expect(result).toEqual({ error: 'Incorrect username or password' });
    });
  });

  describe('logout', () => {
    it('should log out the user successfully', async () => {
      // Mock validateRequest to return a session
      (validateRequest as Mock).mockResolvedValue({
        session: { id: 'sessionId' },
      });

      // Mock lucia.invalidateSession
      (lucia.invalidateSession as Mock).mockResolvedValue({});

      // Mock lucia.createBlankSessionCookie
      (lucia.createBlankSessionCookie as Mock).mockReturnValue({
        name: 'session',
        value: '',
        attributes: {},
      });

      const result = await logout();

      expect(result).toEqual({ success: 'logged out successfully' });
      expect(mockCookies.set).toHaveBeenCalledWith('session', '', {});
    });

    it('should return error if user is unauthorized', async () => {
      // Mock validateRequest to return null session
      (validateRequest as Mock).mockResolvedValue({
        session: null,
      });

      const result = await logout();

      expect(result).toEqual({ error: 'Unauthorized' });
    });
  });
});
