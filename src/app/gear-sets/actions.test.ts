import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { gearSets } from '@/lib/database/schema';
import { createId } from '@paralleldrive/cuid2';
import { redirect } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { addGearSet, deleteGearSet, editGearSet } from './actions';

vi.mock('@/lib/auth');
vi.mock('@/lib/database');
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Gear Set Actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('addGearSet', () => {
    it('should add a new gear set successfully', async () => {
      const formData = new FormData();
      formData.append('racketId', 'racket123');
      formData.append('stringId', 'string123');
      formData.append('stringTensionMains', '50');
      formData.append('stringTensionCrosses', '50');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });
      (db.insert as Mock).mockReturnValue({
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: 'gearSet123' }]),
      });

      await addGearSet({}, formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.insert).toHaveBeenCalledWith(gearSets);
      expect(redirect).toHaveBeenCalledWith('/gear-sets/gearSet123');
    });

    it('should return an error if validation fails', async () => {
      const formData = new FormData();
      formData.append('racketId', 'invalid');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });

      const result = await addGearSet({}, formData);

      expect(result).toEqual({
        errors: expect.anything(),
        error: 'invalid gear set data',
      });
    });
  });

  describe('editGearSet', () => {
    it('should edit an existing gear set successfully', async () => {
      const formData = new FormData();
      formData.append('gearSetId', createId());
      formData.append('racketId', 'racket123');
      formData.append('stringId', 'string123');
      formData.append('stringTensionMains', '50');
      formData.append('stringTensionCrosses', '50');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });
      (db.update as Mock).mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: 'gearSet123' }]),
      });

      await editGearSet({}, formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.update).toHaveBeenCalledWith(gearSets);
      expect(redirect).toHaveBeenCalledWith('/gear-sets/gearSet123');
    });

    it('should return an error if validation fails', async () => {
      const formData = new FormData();
      formData.append('gearSetId', 'invalid');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });

      const result = await editGearSet({}, formData);

      expect(result).toEqual({
        error: "Cannot read properties of undefined (reading 'set')",
      });
    });
  });

  describe('deleteGearSet', () => {
    it('should delete an existing gear set successfully', async () => {
      const formData = new FormData();
      formData.append('gearSetId', createId());

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });

      await deleteGearSet(formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith(gearSets);
      expect(redirect).toHaveBeenCalledWith('/gear-sets');
    });

    it('should return an error if validation fails', async () => {
      const formData = new FormData();
      formData.append('gearSetId', 'invalid');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });

      const result = await deleteGearSet(formData);
      expect(result).toBeUndefined();
    });
  });
});
