import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { rackets } from '@/lib/database/schema';
import { redirect } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { addRacket, deleteRacket, editRacket } from './actions';

vi.mock('@/lib/auth');
vi.mock('@/lib/database');
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Racket Actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('addRacket', () => {
    it('should add a new racket successfully', async () => {
      const formData = new FormData();
      formData.append('model', 'Pro Staff');
      formData.append('year', '2022');
      formData.append('headSize', '100');
      formData.append('stringPattern', '16x19');
      formData.append('weight', '300');
      formData.append('swingWeight', '320');
      formData.append('brandId', 'cuid2');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.insert as Mock).mockReturnValue({
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: 'racket1' }]),
      });

      await addRacket({}, formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.insert).toHaveBeenCalledWith(rackets);
      expect(redirect).toHaveBeenCalledWith('/rackets/racket1');
    });

    it('should return error for invalid data', async () => {
      const formData = new FormData();
      formData.append('model', 'PS');
      formData.append('year', '2022');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

      const result = await addRacket({}, formData);

      expect(result).toEqual({
        errors: {
          model: ['must add model'],
          headSize: ['Expected number, received nan'],
          stringPattern: ['Required'],
          weight: ['Expected number, received nan'],
          swingWeight: ['Expected number, received nan'],
          brandId: ['Required'],
        },
        error: 'invalid racket data',
      });
    });
  });

  describe('editRacket', () => {
    it('should edit a racket successfully', async () => {
      const formData = new FormData();
      formData.append('racketId', 'racket1');
      formData.append('model', 'Pro Staff Updated');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.update as Mock).mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: 'racket1' }]),
      });

      await editRacket({}, formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.update).toHaveBeenCalledWith(rackets);
      expect(redirect).toHaveBeenCalledWith('/rackets/racket1');
    });

    it('should return error for invalid data', async () => {
      const formData = new FormData();
      formData.append('racketId', 'racket1');
      formData.append('model', 'PS');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

      const result = await editRacket({}, formData);

      expect(result).toEqual({
        errors: {
          model: ['must add model'],
        },
        error: 'invalid racket data',
      });
    });
  });

  describe('deleteRacket', () => {
    it('should delete a racket successfully', async () => {
      const formData = new FormData();
      formData.append('racketId', 'racket1');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });

      await deleteRacket(formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith(rackets);
      expect(redirect).toHaveBeenCalledWith('/rackets');
    });

    it('should return error for invalid data', async () => {
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });
      const formData = new FormData();
      formData.append('racketId', 'r1');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

      const result = await deleteRacket(formData);

      expect(result).toBeUndefined();
    });
  });
});
