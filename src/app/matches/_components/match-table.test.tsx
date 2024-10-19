import { Match } from '@/shared/types';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MatchTable from './match-table';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../actions', () => ({
  deleteMatch: vi.fn(),
}));

const mockMatches: Match[] = [
  {
    id: '1',
    organization: 'Org1',
    location: 'Location1',
    city: 'City1',
    state: 'State1',
    playDate: '2023-01-01T00:00:00.000Z',
    notes: null,
    firstSetSelf: null,
    firstSetOpponent: null,
    firstSetTieBreakSelf: null,
    firstSetTieBreakOpponent: null,
    secondSetSelf: null,
    secondSetOpponent: null,
    secondSetTieBreakSelf: null,
    secondSetTieBreakOpponent: null,
    thirdSetSelf: null,
    thirdSetOpponent: null,
    thirdSetTieBreakSelf: null,
    thirdSetTieBreakOpponent: null,
    gearId: null,
    userId: 'user1',
    createdAt: null,
  },
  {
    id: '2',
    organization: 'Org2',
    location: 'Location2',
    city: 'City2',
    state: 'State2',
    playDate: '2023-02-01T00:00:00.000Z',
    notes: null,
    firstSetSelf: null,
    firstSetOpponent: null,
    firstSetTieBreakSelf: null,
    firstSetTieBreakOpponent: null,
    secondSetSelf: null,
    secondSetOpponent: null,
    secondSetTieBreakSelf: null,
    secondSetTieBreakOpponent: null,
    thirdSetSelf: null,
    thirdSetOpponent: null,
    thirdSetTieBreakSelf: null,
    thirdSetTieBreakOpponent: null,
    gearId: null,
    userId: 'user2',
    createdAt: null,
  },
];

describe('MatchTable', () => {
  it('renders the table with matches', async () => {
    render(<MatchTable matchesPromise={Promise.resolve(mockMatches)} />);

    await waitFor(() => {
      expect(screen.getByText('ORG1')).toBeInTheDocument();
      expect(screen.getByText('ORG2')).toBeInTheDocument();
      expect(screen.getByText('Location1')).toBeInTheDocument();
      expect(screen.getByText('Location2')).toBeInTheDocument();
      expect(screen.getByText('City1')).toBeInTheDocument();
      expect(screen.getByText('City2')).toBeInTheDocument();
      expect(screen.getByText('State1')).toBeInTheDocument();
      expect(screen.getByText('State2')).toBeInTheDocument();
      // expect(screen.getByText('1/1/2023')).toBeInTheDocument();
      // expect(screen.getByText('2/1/2023')).toBeInTheDocument();
    });
  });

  it('renders action buttons for each match', async () => {
    render(<MatchTable matchesPromise={Promise.resolve(mockMatches)} />);

    await waitFor(() => {
      const viewButtons = screen.getAllByText('View');
      const editButtons = screen.getAllByText('Edit');
      const deleteButtons = screen.getAllByText('Delete');

      expect(viewButtons).toHaveLength(mockMatches.length);
      expect(editButtons).toHaveLength(mockMatches.length);
      expect(deleteButtons).toHaveLength(mockMatches.length);
    });
  });
});
