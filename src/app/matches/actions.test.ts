import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { redirect } from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { addMatch, deleteMatch, editMatch } from './actions';

// Mock dependencies
vi.mock('@/lib/auth');
vi.mock('@/lib/database');
vi.mock('next/navigation');

describe('Match Actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('addMatch', () => {
    it('should add a new match and redirect on success', async () => {
      const mockUser = { id: 'user123' };
      const mockMatch = { id: 'match123' };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.insert as Mock).mockReturnValue({
        values: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: mockMatch.id }]),
      });

      const formData = new FormData();
      formData.append('organization', 'Test Org');
      formData.append('location', 'Test Location');
      formData.append('city', 'Test City');
      formData.append('state', 'TS');
      formData.append('playDate', '2023-04-01');
      formData.append('notes', 'Test Notes');
      formData.append('firstSetSelf', '6');
      formData.append('firstSetOpponent', '4');
      formData.append('secondSetSelf', '6');
      formData.append('secondSetOpponent', '3');
      formData.append('gearId', 'gear123');

      await addMatch({}, formData);

      expect(redirect).toHaveBeenCalledWith('/matches/match123');
    });

    it('should return errors for invalid data', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });

      const formData = new FormData();
      // Intentionally omit required fields

      const result = await addMatch({}, formData);

      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('error', 'invalid match data');
    });
  });

  describe('editMatch', () => {
    it('should edit an existing match and redirect on success', async () => {
      const mockUser = { id: 'user123' };
      const mockMatch = { id: 'match123' };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.update as Mock).mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{ id: mockMatch.id }]),
      });

      const formData = new FormData();
      formData.append('matchId', 'match123');
      formData.append('organization', 'Updated Org');
      formData.append('notes', 'Updated Notes');

      await editMatch({}, formData);

      expect(redirect).toHaveBeenCalledWith('/matches/match123');
    });

    it('should return errors for invalid data', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });

      const formData = new FormData();
      // Intentionally omit required fields

      const result = await editMatch({}, formData);

      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('error', 'invalid match data');
    });
  });

  describe('deleteMatch', () => {
    it('should delete a match and redirect on success', async () => {
      const mockUser = { id: 'user123' };
      (validateRequest as Mock).mockResolvedValue({ user: mockUser });
      (db.delete as Mock).mockReturnValue({
        where: vi.fn().mockReturnThis(),
      });

      const formData = new FormData();
      formData.append('matchId', 'match123');

      await deleteMatch(formData);

      expect(db.delete).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith('/matches/new');
    });

    it('should throw an error for invalid data', async () => {
      (validateRequest as Mock).mockResolvedValue({ user: { id: 'user123' } });

      const formData = new FormData();

      await expect(deleteMatch(formData)).rejects.toThrow(
        'could not delete match',
      );
    });
  });
});
