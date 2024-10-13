import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { strings } from '@/lib/database/schema';
import { FormData } from 'formdata-polyfill/esm.min.js';
import { redirect } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { addString, deleteString, editString } from './actions';

vi.mock('@/lib/auth');
vi.mock('@/lib/database');
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('String Actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  describe('addString', () => {
    it('should add a new string successfully', async () => {
      const mockUser = { id: 'user1' };
      const mockString = {
        id: 'string1',
        model: 'Model1',
        composition: 'Comp1',
        gauge: 'Gauge1',
        brandId: 'brand1',
      };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.insert as Mock).mockResolvedValue([mockString]);

      const formData = new FormData();
      formData.append('model', 'Model1');
      formData.append('composition', 'Comp1');
      formData.append('gauge', 'Gauge1');
      formData.append('brandId', 'brand1');

      const result = await addString({}, formData);

      expect(result).toEqual(expect.anything());
      expect(db.insert).toHaveBeenCalledWith(expect.anything());
    });

    it('should return error for invalid data', async () => {
      const mockUser = { id: 'user1' };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });

      const formData = new FormData();
      formData.append('model', 'Mo');
      formData.append('composition', 'Co');
      formData.append('gauge', 'Ga');
      formData.append('brandId', 'brand1');

      const result = await addString({}, formData);

      expect(result).toEqual({
        errors: expect.anything(),
        error: 'invalid string data',
      });
    });
  });

  describe('editString', () => {
    it('should edit an existing string successfully', async () => {
      const mockUser = { id: 'user1' };
      const mockString = {
        id: 'string1',
        model: 'Model1',
        composition: 'Comp1',
        gauge: 'Gauge1',
        brandId: 'brand1',
      };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.update as Mock).mockResolvedValue([mockString]);

      const formData = new FormData();
      formData.append('stringId', 'string1');
      formData.append('model', 'Model1');
      formData.append('composition', 'Comp1');
      formData.append('gauge', 'Gauge1');
      formData.append('brandId', 'brand1');

      const result = await editString({}, formData);

      expect(result).toEqual(expect.anything());
      expect(db.update).toHaveBeenCalledWith(expect.anything());
    });

    it('should return error for invalid data', async () => {
      const mockUser = { id: 'user1' };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });

      const formData = new FormData();
      formData.append('stringId', 'string1');
      formData.append('model', 'Mo');
      formData.append('composition', 'Co');
      formData.append('gauge', 'Ga');
      formData.append('brandId', 'brand1');

      const result = await editString({}, formData);

      expect(result).toEqual({
        errors: expect.anything(),
        error: 'invalid string data',
      });
    });
  });

  describe('deleteString', () => {
    it('should delete a string successfully', async () => {
      const formData = new FormData();
      formData.append('stringId', 'string1');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });

      await deleteString(formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith(strings);
      expect(redirect).toHaveBeenCalledWith('/strings');
    });

    it('should return error for invalid data', async () => {
      const mockUser = { id: 'user1' };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });

      const formData = new FormData();
      formData.append('stringId', 'st');

      const result = await deleteString(formData);

      expect(result).toBeUndefined();
    });
  });
});
