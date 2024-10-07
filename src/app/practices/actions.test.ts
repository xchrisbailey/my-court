import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { FormData } from 'formdata-polyfill/esm.min.js';
import { redirect } from 'next/navigation';
import { describe, expect, it, Mock, vi } from 'vitest';
import { addPractice } from './actions';

vi.mock('@/lib/auth');
vi.mock('@/lib/database');
vi.mock('next/navigation');

describe('addPractice', () => {
  it('should throw an error if user is not authenticated', async () => {
    (validateRequest as Mock).mockResolvedValue({ user: null });

    const formData = new FormData();
    formData.append('type', 'practice');
    formData.append('playDate', '2023-10-10');
    formData.append('location', 'Court 1');
    formData.append('city', 'City');
    formData.append('state', 'ST');
    formData.append('notes', 'Some notes');

    await expect(addPractice({}, formData)).rejects.toThrow('unauthorized');
  });

  it('should return errors if form data is invalid', async () => {
    (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });

    const formData = new FormData();
    formData.append('type', 'pr');
    formData.append('playDate', '2023-10-10');
    formData.append('location', 'Co');
    formData.append('city', 'Ci');
    formData.append('state', 'S');
    formData.append('notes', 'No');

    const result = await addPractice({}, formData);

    expect(result).toEqual({
      errors: {
        type: ['String must contain at least 3 character(s)'],
        location: ['String must contain at least 3 character(s)'],
        city: ['String must contain at least 3 character(s)'],
        state: ['String must contain at least 2 character(s)'],
        notes: ['String must contain at least 3 character(s)'],
      },
      error: 'Invalid practice data',
    });
  });

  it('should return error if database insertion fails', async () => {
    (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
    (db.insert as Mock).mockReturnValue({
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockRejectedValue(new Error('DB error')),
    });

    const formData = new FormData();
    formData.append('type', 'practice');
    formData.append('playDate', '2023-10-10');
    formData.append('location', 'Court 1');
    formData.append('city', 'City');
    formData.append('state', 'ST');
    formData.append('notes', 'Some notes');

    const result = await addPractice({}, formData);

    expect(result).toEqual({
      error: 'DB error',
    });
  });

  it('should redirect to the new practice page on success', async () => {
    (validateRequest as Mock).mockResolvedValue({ user: { id: 'user1' } });
    (db.insert as Mock).mockReturnValue({
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{ id: 'practice1' }]),
    });

    const formData = new FormData();
    formData.append('type', 'practice');
    formData.append('playDate', '2023-10-10');
    formData.append('location', 'Court 1');
    formData.append('city', 'City');
    formData.append('state', 'ST');
    formData.append('notes', 'Some notes');

    await addPractice({}, formData);

    expect(redirect).toHaveBeenCalledWith('/practices/practice1');
  });
});
