import { Match } from '@/shared/types';
import { describe, expect, it } from 'vitest';
import { matchOutcome } from './utils';

describe('matchOutcome', () => {
  it('should return "Win" when self wins 2 sets', () => {
    const match: Match = {
      firstSetSelf: 6,
      firstSetOpponent: 4,
      firstSetTieBreakSelf: 0,
      firstSetTieBreakOpponent: 0,
      secondSetSelf: 6,
      secondSetOpponent: 4,
      secondSetTieBreakSelf: 0,
      secondSetTieBreakOpponent: 0,
      thirdSetSelf: 0,
      thirdSetOpponent: 0,
      thirdSetTieBreakSelf: 0,
      thirdSetTieBreakOpponent: 0,
      id: '',
      organization: '',
      location: '',
      city: '',
      state: '',
      playDate: '',
      notes: null,
      gearId: null,
      userId: '',
      createdAt: null,
    };
    expect(matchOutcome(match)).toBe('Win');
  });

  it('should return "Loss" when opponent wins 2 sets', () => {
    const match: Match = {
      firstSetSelf: 4,
      firstSetOpponent: 6,
      firstSetTieBreakSelf: 0,
      firstSetTieBreakOpponent: 0,
      secondSetSelf: 4,
      secondSetOpponent: 6,
      secondSetTieBreakSelf: 0,
      secondSetTieBreakOpponent: 0,
      thirdSetSelf: 0,
      thirdSetOpponent: 0,
      thirdSetTieBreakSelf: 0,
      thirdSetTieBreakOpponent: 0,
      id: '',
      organization: '',
      location: '',
      city: '',
      state: '',
      playDate: '',
      notes: null,
      gearId: null,
      userId: '',
      createdAt: null,
    };
    expect(matchOutcome(match)).toBe('Loss');
  });

  it('should return "Draw" when both win 1 set and the third set is a draw', () => {
    const match: Match = {
      firstSetSelf: 6,
      firstSetOpponent: 4,
      firstSetTieBreakSelf: 0,
      firstSetTieBreakOpponent: 0,
      secondSetSelf: 4,
      secondSetOpponent: 6,
      secondSetTieBreakSelf: 0,
      secondSetTieBreakOpponent: 0,
      thirdSetSelf: 6,
      thirdSetOpponent: 6,
      thirdSetTieBreakSelf: 0,
      thirdSetTieBreakOpponent: 0,
      id: '',
      organization: '',
      location: '',
      city: '',
      state: '',
      playDate: '',
      notes: null,
      gearId: null,
      userId: '',
      createdAt: null,
    };
    expect(matchOutcome(match)).toBe('Draw');
  });

  it('should return "Win" when self wins 2 sets with tie breaks', () => {
    const match: Match = {
      firstSetSelf: 6,
      firstSetOpponent: 6,
      firstSetTieBreakSelf: 7,
      firstSetTieBreakOpponent: 5,
      secondSetSelf: 6,
      secondSetOpponent: 6,
      secondSetTieBreakSelf: 7,
      secondSetTieBreakOpponent: 5,
      thirdSetSelf: 0,
      thirdSetOpponent: 0,
      thirdSetTieBreakSelf: 0,
      thirdSetTieBreakOpponent: 0,
      id: '',
      organization: '',
      location: '',
      city: '',
      state: '',
      playDate: '',
      notes: null,
      gearId: null,
      userId: '',
      createdAt: null,
    };
    expect(matchOutcome(match)).toBe('Win');
  });

  it('should return "Loss" when opponent wins 2 sets with tie breaks', () => {
    const match: Match = {
      firstSetSelf: 6,
      firstSetOpponent: 6,
      firstSetTieBreakSelf: 5,
      firstSetTieBreakOpponent: 7,
      secondSetSelf: 6,
      secondSetOpponent: 6,
      secondSetTieBreakSelf: 5,
      secondSetTieBreakOpponent: 7,
      thirdSetSelf: 0,
      thirdSetOpponent: 0,
      thirdSetTieBreakSelf: 0,
      thirdSetTieBreakOpponent: 0,
      id: '',
      organization: '',
      location: '',
      city: '',
      state: '',
      playDate: '',
      notes: null,
      gearId: null,
      userId: '',
      createdAt: null,
    };
    expect(matchOutcome(match)).toBe('Loss');
  });
});
