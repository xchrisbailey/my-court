import { login, logout, signup } from '@/app/(auth)/actions';
import {
  addPractice,
  deletePractice,
  editPractice,
} from '@/app/practices/actions';
import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { hash, verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

vi.mock('@/lib/auth');
vi.mock('@/lib/database');
vi.mock('next/navigation');

describe('Practice Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('addPractice', () => {
    it('should add a new practice and redirect', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.insert as Mock).mockReturnValue({
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: 'practice1' }]),
      });

      const formData = new FormData();
      formData.append('type', 'Basketball');
      formData.append('playDate', '2023-10-01');
      formData.append('location', 'Gym');
      formData.append('city', 'New York');
      formData.append('state', 'NY');
      formData.append('notes', 'Bring water');
      formData.append('gearId', 'gear1');

      const result = await addPractice({}, formData);

      expect(redirect).toHaveBeenCalledWith('/practices/practice1');
      expect(result).toBeUndefined();
    });

    it('should return errors if validation fails', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

      const formData = new FormData();
      formData.append('type', 'Ba');
      formData.append('playDate', '2023-10-01');
      formData.append('location', 'Gym');
      formData.append('city', 'New York');
      formData.append('state', 'NY');
      formData.append('notes', 'Bring water');
      formData.append('gearId', 'gear1');

      const result = await addPractice({}, formData);

      expect(result).toEqual({
        errors: {
          type: ['String must contain at least 3 character(s)'],
        },
        error: 'Invalid practice data',
      });
    });
  });

  describe('editPractice', () => {
    it('should edit an existing practice and redirect', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.update as Mock).mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: 'practice1' }]),
      });

      const formData = new FormData();
      formData.append('practiceId', 'practice1');
      formData.append('type', 'Basketball');

      const result = await editPractice({}, formData);

      expect(redirect).toHaveBeenCalledWith('/practices/practice1');
      expect(result).toBeUndefined();
    });

    it('should return errors if validation fails', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

      const formData = new FormData();
      formData.append('practiceId', 'practice1');
      formData.append('type', 'Ba');

      const result = await editPractice({}, formData);

      expect(result).toEqual({
        errors: {
          type: ['String must contain at least 3 character(s)'],
        },
        error: 'Invalid practice data',
      });
    });
  });
  describe('deletePractice', () => {
    it('should delete an existing practice', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });

      const result = await deletePractice('practice1');

      expect(db.delete).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should throw an error if user is not authorized', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: null });

      await expect(deletePractice('practice1')).rejects.toThrow('unauthorized');
    });

    it('should handle database errors gracefully', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockImplementation(() => {
          throw new Error('Database error');
        }),
      });

      await expect(deletePractice('practice1')).rejects.toThrow(
        'Database error',
      );
    });

    vi.mock('@/lib/auth');
    vi.mock('@/lib/database');
    vi.mock('next/headers');
    vi.mock('next/navigation');
    vi.mock('@node-rs/argon2');

    describe('Auth Actions', () => {
      beforeEach(() => {
        vi.clearAllMocks();
      });

      describe('signup', () => {
        it('should sign up a new user and redirect', async () => {
          (db.insert as Mock).mockReturnValue({
            values: vi.fn().mockReturnThis(),
            returning: vi.fn().mockResolvedValue([{ id: 'user1' }]),
          });
          (hash as Mock).mockResolvedValue('hashedPassword');
          (cookies as Mock).mockReturnValue({
            set: vi.fn(),
          });

          const formData = new FormData();
          formData.append('email', 'test@example.com');
          formData.append('password', 'password123');

          const result = await signup({}, formData);

          expect(redirect).toHaveBeenCalledWith('/');
          expect(result).toBeUndefined();
        });

        it('should return errors if validation fails', async () => {
          const formData = new FormData();
          formData.append('email', 'invalid-email');
          formData.append('password', '123');

          const result = await signup({}, formData);

          expect(result).toEqual({
            errors: {
              email: ['Invalid email'],
              password: ['password must be at least 6 characters'],
            },
            error: 'invalid email or password',
          });
        });

        it('should return error if email is already in use', async () => {
          (db.insert as Mock).mockReturnValue({
            values: vi.fn().mockReturnThis(),
            returning: vi
              .fn()
              .mockRejectedValue(new Error('user_email_unique')),
          });

          const formData = new FormData();
          formData.append('email', 'test@example.com');
          formData.append('password', 'password123');

          const result = await signup({}, formData);

          expect(result).toEqual({
            error: 'Email already in use',
          });
        });
      });

      describe('login', () => {
        it('should log in an existing user and redirect', async () => {
          (db.query.users.findFirst as Mock).mockResolvedValue({
            id: 'user1',
            password: 'hashedPassword',
          });
          (verify as Mock).mockResolvedValue(true);
          (cookies as Mock).mockReturnValue({
            set: vi.fn(),
          });

          const formData = new FormData();
          formData.append('email', 'test@example.com');
          formData.append('password', 'password123');

          const result = await login({}, formData);

          expect(redirect).toHaveBeenCalledWith('/');
          expect(result).toBeUndefined();
        });

        it('should return error if email or password is incorrect', async () => {
          (db.query.users.findFirst as Mock).mockResolvedValue(null);

          const formData = new FormData();
          formData.append('email', 'test@example.com');
          formData.append('password', 'password123');

          const result = await login({}, formData);

          expect(result).toEqual({
            error: 'Incorrect username or password',
          });
        });

        it('should return error if password is incorrect', async () => {
          (db.query.users.findFirst as Mock).mockResolvedValue({
            id: 'user1',
            password: 'hashedPassword',
          });
          (verify as Mock).mockResolvedValue(false);

          const formData = new FormData();
          formData.append('email', 'test@example.com');
          formData.append('password', 'password123');

          const result = await login({}, formData);

          expect(result).toEqual({
            error: 'Incorrect username or password',
          });
        });
      });

      describe('logout', () => {
        it('should log out the user', async () => {
          (validateRequest as Mock).mockResolvedValue({
            session: { id: 'session1' },
          });
          (cookies as Mock).mockReturnValue({
            set: vi.fn(),
          });

          const result = await logout();

          expect(result).toEqual({
            success: 'logged out successfully',
          });
        });

        it('should return error if user is not authorized', async () => {
          (validateRequest as Mock).mockResolvedValue({ session: null });

          const result = await logout();

          expect(result).toEqual({
            error: 'Unauthorized',
          });
        });
      });
    });
  });
});
