import { Practice } from '@/shared/types';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import PracticeTable from './practice-table';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../actions', () => ({
  deletePractice: vi.fn(),
}));

const mockPractices: Practice[] = [
  {
    id: '1',
    type: 'Basketball',
    location: 'Gym A',
    city: 'New York',
    state: 'NY',
    playDate: '2023-10-01T00:00:00Z',
    notes: null,
    gearId: null,
    userId: null,
    createdAt: null,
  },
  {
    id: '2',
    type: 'Soccer',
    location: 'Field B',
    city: 'Los Angeles',
    state: 'CA',
    playDate: '2023-11-01T00:00:00Z',
    notes: null,
    gearId: null,
    userId: null,
    createdAt: null,
  },
];

describe('PracticeTable', () => {
  const useRouterMock = useRouter as Mock;

  beforeEach(() => {
    useRouterMock.mockReturnValue({
      refresh: vi.fn(),
    });
  });

  it('renders practice table with data', async () => {
    render(<PracticeTable practicesPromise={Promise.resolve(mockPractices)} />);

    await waitFor(() => {
      expect(screen.getByText('BASKETBALL')).toBeInTheDocument();
      expect(screen.getByText('Gym A')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('NY')).toBeInTheDocument();
      // expect(screen.getByText('10/1/2023')).toBeInTheDocument();

      expect(screen.getByText('SOCCER')).toBeInTheDocument();
      expect(screen.getByText('Field B')).toBeInTheDocument();
      expect(screen.getByText('Los Angeles')).toBeInTheDocument();
      expect(screen.getByText('CA')).toBeInTheDocument();
      // expect(screen.getByText('11/1/2023')).toBeInTheDocument();
    });
  });

  // it('handles delete action', async () => {
  //   render(<PracticeTable practicesPromise={Promise.resolve(mockPractices)} />);

  //   await waitFor(() => {
  //     expect(screen.getByText('BASKETBALL')).toBeInTheDocument();
  //   });

  //   fireEvent.click(screen.getAllByLabelText('Delete')[0]);

  //   await waitFor(() => {
  //     expect(screen.getByText('Delete Practice')).toBeInTheDocument();
  //   });

  //   fireEvent.click(screen.getByText('Delete'));

  //   await waitFor(() => {
  //     expect(deletePractice).toHaveBeenCalledWith('1');
  //   });
  // });
});
