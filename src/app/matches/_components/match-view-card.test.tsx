import { MatchWithRelations } from '@/shared/types';
import { render, screen, waitFor } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import MatchViewCard, { ScoreDisplay } from './match-view-card';

describe('ScoreDisplay', () => {
  const mockProps = {
    selfScore: 6,
    opponentScore: 4,
    setNumber: 1,
    selfTiebreak: 7,
    opponentTiebreak: 5,
  };

  it('renders the set number', () => {
    render(<ScoreDisplay {...mockProps} />);
    expect(screen.getByText('Set 1')).toBeInTheDocument();
  });

  it('renders the self and opponent scores', () => {
    render(<ScoreDisplay {...mockProps} />);
    expect(screen.getByText('6-4')).toBeInTheDocument();
  });

  it('renders the tiebreak scores if provided', async () => {
    await render(<ScoreDisplay {...mockProps} />);
    expect(screen.getByText(/7/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });

  it('does not render tiebreak scores if not provided', () => {
    const propsWithoutTiebreak = {
      ...mockProps,
      selfTiebreak: undefined,
      opponentTiebreak: undefined,
    };
    render(<ScoreDisplay {...propsWithoutTiebreak} />);
    expect(screen.queryByText('7')).not.toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });
});

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('MatchViewCard', () => {
  const mockMatch: MatchWithRelations = {
    user: {
      id: 'user-1',
      email: 'user1@example.com',
      password: 'password123',
    },
    id: 'match-1',
    gearId: 'gear-1',
    userId: 'user-1',
    createdAt: new Date('2023-10-01'),
    firstSetSelf: 6,
    firstSetOpponent: 4,
    firstSetTieBreakSelf: 7,
    firstSetTieBreakOpponent: 5,
    secondSetSelf: 3,
    secondSetOpponent: 6,
    secondSetTieBreakSelf: null,
    secondSetTieBreakOpponent: null,
    thirdSetSelf: 6,
    thirdSetOpponent: 7,
    thirdSetTieBreakSelf: 8,
    thirdSetTieBreakOpponent: 10,
    location: 'Court 1',
    city: 'New York',
    state: 'NY',
    organization: 'USTA',
    playDate: '2023-10-01T00:00:00.000Z',
    notes: '<p>Great match!</p>',
    gear: {
      id: 'gear-1',
      userId: 'user-1',
      racketId: 'racket-1',
      createdAt: new Date('2023-01-01'),
      stringId: '3',
      stringTensionMains: 55,
      stringTensionCrosses: 53,
      racket: {
        id: 'racket-1',
        model: 'Pro Staff',
        year: 2022,
        headSize: 97,
        stringPattern: '16x19',
        weight: 315,
        swingWeight: 320,
        brandId: '1',
        createdAt: new Date('2023-01-01'),
        brand: {
          id: '1',
          name: 'Wilson',
          about: 'Leading brand in tennis equipment',
          logoLink: 'https://example.com/wilson-logo.png',
          createdAt: new Date('2023-01-01'),
        },
      },
      strings: {
        id: '3',
        model: 'ALU Power',
        brandId: '2',
        createdAt: new Date('2023-01-02'),
        gauge: '16L',
        composition: 'Co-polyester',
        brand: {
          id: '2',
          name: 'Luxilon',
          about: 'High-quality tennis strings',
          logoLink: 'https://example.com/luxilon-logo.png',
          createdAt: new Date('2023-01-02'),
        },
      },
    },
  };

  it('renders match details correctly', async () => {
    render(<MatchViewCard matchPromise={Promise.resolve(mockMatch)} />);

    await waitFor(() => {
      expect(screen.getByText('Match Result')).toBeInTheDocument();
      expect(screen.getByText('Set 1')).toBeInTheDocument();
      expect(screen.getByText('6-4')).toBeInTheDocument();
      expect(screen.getByText('(7-5)')).toBeInTheDocument();
      expect(screen.getByText('Set 2')).toBeInTheDocument();
      expect(screen.getByText('3-6')).toBeInTheDocument();
      expect(screen.getByText('(0-0)')).toBeInTheDocument();
      expect(screen.getByText('Set 3')).toBeInTheDocument();
      expect(screen.getByText('6-7')).toBeInTheDocument();
      expect(screen.getByText('(8-10)')).toBeInTheDocument();
      expect(screen.getByText(/Court 1, New York, NY/i)).toBeInTheDocument();
      expect(screen.getByText('Organization:')).toBeInTheDocument();
      expect(screen.getByText('USTA')).toBeInTheDocument();
      expect(screen.getByText('9/30/2023')).toBeInTheDocument();
      expect(screen.getByText('Notes:')).toBeInTheDocument();
      expect(screen.getByText('Great match!')).toBeInTheDocument();
      expect(screen.getByText('Gear Used:')).toBeInTheDocument();
      expect(screen.getByText(/Wilson Pro Staff/i)).toBeInTheDocument();
      expect(screen.getByText(/Luxilon ALU Power/i)).toBeInTheDocument();
    });
  });

  it('calls notFound if match is undefined', async () => {
    render(<MatchViewCard matchPromise={Promise.resolve(undefined)} />);

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });
});
