import { determineWinner, formatScore } from '@/app/profile/utils';
import { Match } from '@/shared/types';
import { describe, expect, it } from 'vitest';

describe('formatScore', () => {
  it('should return "-" if self or opponent score is null', () => {
    expect(formatScore(null, 6, null, null)).toBe('-');
    expect(formatScore(6, null, null, null)).toBe('-');
  });

  it('should return the correct score format without tiebreak', () => {
    expect(formatScore(6, 4, null, null)).toBe('6-4');
  });

  it('should return the correct score format with tiebreak', () => {
    expect(formatScore(6, 6, 7, 5)).toBe('6-6 (7-5)');
  });
});

describe('determineWinner', () => {
  const createMatch = (
    firstSetSelf: number | null,
    firstSetOpponent: number | null,
    secondSetSelf: number | null,
    secondSetOpponent: number | null,
    thirdSetSelf: number | null,
    thirdSetOpponent: number | null,
  ): Match => ({
    id: 'match1',
    playDate: new Date().toISOString(),
    location: 'Court 1',
    userId: 'player1',
    organization: 'player2',
    // score: '6-4, 6-4',
    firstSetSelf,
    firstSetOpponent,
    secondSetSelf,
    secondSetOpponent,
    thirdSetSelf,
    thirdSetOpponent,
    city: '',
    state: '',
    notes: null,
    firstSetTieBreakSelf: null,
    firstSetTieBreakOpponent: null,
    secondSetTieBreakSelf: null,
    secondSetTieBreakOpponent: null,
    thirdSetTieBreakSelf: null,
    thirdSetTieBreakOpponent: null,
    gearId: null,
    createdAt: null,
  });

  it('should return "win" if self wins more sets', () => {
    const match = createMatch(6, 4, 6, 4, null, null);
    expect(determineWinner(match)).toBe('win');
  });

  it('should return "loss" if opponent wins more sets', () => {
    const match = createMatch(4, 6, 4, 6, null, null);
    expect(determineWinner(match)).toBe('loss');
  });

  it('should return "win" if self wins in three sets', () => {
    const match = createMatch(6, 4, 4, 6, 6, 4);
    expect(determineWinner(match)).toBe('win');
  });

  it('should return "loss" if opponent wins in three sets', () => {
    const match = createMatch(4, 6, 6, 4, 4, 6);
    expect(determineWinner(match)).toBe('loss');
  });

  it('should handle null values correctly', () => {
    const match = createMatch(null, null, 6, 4, 6, 4);
    expect(determineWinner(match)).toBe('win');
  });
});
