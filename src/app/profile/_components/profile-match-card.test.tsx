import { Match } from '@/shared/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import { determineWinner, formatScore } from '../utils';
import { ProfileMatchCard } from './profile-match-card';

vi.mock('../utils', () => ({
  determineWinner: vi.fn(),
  formatScore: vi.fn(),
}));

describe('ProfileMatchCard', () => {
  const mockMatch: Match = {
    id: '1',
    userId: 'user-1',
    createdAt: null,
    organization: 'Test Org',
    playDate: '2023-10-01T00:00:00Z',
    location: 'Test Location',
    city: 'Test City',
    state: 'Test State',
    notes: null,
    firstSetSelf: 6,
    firstSetOpponent: 4,
    firstSetTieBreakSelf: null,
    firstSetTieBreakOpponent: null,
    secondSetSelf: 3,
    secondSetOpponent: 6,
    secondSetTieBreakSelf: null,
    secondSetTieBreakOpponent: null,
    thirdSetSelf: 7,
    thirdSetOpponent: 6,
    thirdSetTieBreakSelf: 7,
    thirdSetTieBreakOpponent: 5,
    gearId: null,
  };

  it('renders match details correctly', () => {
    (determineWinner as Mock).mockReturnValue('win');
    (formatScore as Mock).mockImplementation(
      (self, opponent) => `${self}-${opponent}`,
    );

    render(<ProfileMatchCard match={mockMatch} />);

    expect(screen.getByText('TEST ORG')).toBeInTheDocument();
    expect(screen.getByText('9/30/2023')).toBeInTheDocument();
    expect(
      screen.getByText('Test Location, Test City, Test State'),
    ).toBeInTheDocument();
    expect(screen.getByText('WIN')).toBeInTheDocument();
    expect(screen.getByText('6-4')).toBeInTheDocument();
    expect(screen.getByText('3-6')).toBeInTheDocument();
    expect(screen.getByText('7-6')).toBeInTheDocument();
  });

  it('renders secondary badge for loss', () => {
    (determineWinner as Mock).mockReturnValue('loss');

    render(<ProfileMatchCard match={mockMatch} />);

    expect(screen.getByText('LOSS')).toBeInTheDocument();
  });

  it('does not render third set if not present', () => {
    const matchWithoutThirdSet = {
      ...mockMatch,
      thirdSetSelf: null,
      thirdSetOpponent: null,
    };

    render(<ProfileMatchCard match={matchWithoutThirdSet} />);

    expect(screen.queryByText('7-6')).not.toBeInTheDocument();
  });
});
