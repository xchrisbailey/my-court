import {
  addPractice,
  deletePractice,
  editPractice,
} from '@/app/practices/actions';
import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
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

        await expect(deletePractice('practice1')).rejects.toThrow(
          'unauthorized',
        );
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
    });
  });
});
