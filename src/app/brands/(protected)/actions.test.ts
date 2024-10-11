import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { brands } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { addBrand, deleteBrand, editBrand } from './actions';

vi.mock('@/lib/auth');
vi.mock('@/lib/database');
vi.mock('next/navigation');

describe('Brand Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('addBrand', () => {
    it('should add a new brand and redirect', async () => {
      const mockUser = { id: 'user1' };
      const mockBrand = {
        id: 'brand1',
        name: 'Test Brand',
        logoLink: 'http://example.com/logo.png',
        about: 'About Test Brand',
      };
      const formData = new FormData();
      formData.append('name', 'Test Brand');
      formData.append('logoLink', 'http://example.com/logo.png');
      formData.append('about', 'About Test Brand');

      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.insert as Mock).mockReturnValue({
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([mockBrand]),
      });

      const result = await addBrand({}, formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(redirect).toHaveBeenCalledWith(`/brands/${mockBrand.id}`);
      expect(result).toBeUndefined();
    });

    it('should return error if validation fails', async () => {
      const formData = new FormData();
      formData.append('name', 'Te');
      formData.append('logoLink', 'invalid-url');
      formData.append('about', 'Ab');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

      const result = await addBrand({}, formData);

      expect(result).toEqual({
        errors: expect.any(Object),
        error: 'invalid brand data',
      });
    });

    it('should return error if user is unauthorized', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: null });
      await expect(addBrand({}, new FormData())).rejects.toThrow(
        'unauthorized',
      );
    });
  });

  describe('editBrand', () => {
    it('should edit an existing brand and redirect', async () => {
      const mockUser = { id: 'user1' };
      const mockBrand = {
        id: 'brand1',
        name: 'Updated Brand',
        logoLink: 'http://example.com/logo.png',
        about: 'Updated About',
      };
      const formData = new FormData();
      formData.append('brandId', 'brand1');
      formData.append('name', 'Updated Brand');
      formData.append('logoLink', 'http://example.com/logo.png');
      formData.append('about', 'Updated About');

      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.update as Mock).mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([mockBrand]),
      });

      const result = await editBrand({}, formData);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(redirect).toHaveBeenCalledWith(`/brands/${mockBrand.id}`);
      expect(result).toBeUndefined();
    });

    it('should return error if validation fails', async () => {
      const formData = new FormData();
      formData.append('brandId', 'br');
      formData.append('name', 'Up');
      formData.append('logoLink', 'invalid-url');
      formData.append('about', 'Up');

      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

      const result = await editBrand({}, formData);

      expect(result).toEqual({
        errors: expect.any(Object),
        error: 'invalid brand data',
      });
    });

    it('should return error if user is unauthorized', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: null });
      await expect(editBrand({}, new FormData())).rejects.toThrow(
        'unauthorized',
      );
    });
  });

  describe('deleteBrand', () => {
    it('should delete a brand and redirect', async () => {
      const mockUser = { id: 'user1' };
      const brandId = 'brand1';

      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
        execute: vi.fn().mockResolvedValue(undefined),
      });

      await deleteBrand(brandId);

      expect(validateRequest).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith(expect.anything());
      expect(db.delete(brands).where).toHaveBeenCalledWith(
        eq(brands.id, brandId),
      );
      expect(redirect).toHaveBeenCalled();
    });

    it('should throw an error if user is unauthorized', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: null });

      await expect(deleteBrand('brand1')).rejects.toThrow('unauthorized');

      expect(db.delete).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should throw an error if deletion fails', async () => {
      const mockUser = { id: 'user1' };
      const brandId = 'brand1';

      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
        execute: vi.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(deleteBrand(brandId)).rejects.toThrow('Database error');

      expect(validateRequest).toHaveBeenCalled();
      expect(db.delete).toHaveBeenCalledWith(expect.anything());
      expect(db.delete(brands).where).toHaveBeenCalledWith(
        eq(brands.id, brandId),
      );
      expect(redirect).not.toHaveBeenCalled();
    });
  });
});
