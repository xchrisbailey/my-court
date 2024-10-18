import { Match } from '@/shared/types';

export function formatScore(
  self: number | null,
  opponent: number | null,
  tiebreakSelf: number | null,
  tiebreakOpponent: number | null,
): string {
  if (self === null || opponent === null) return '-';
  let score = `${self}-${opponent}`;
  if (
    self === 6 &&
    opponent === 6 &&
    tiebreakSelf !== null &&
    tiebreakOpponent !== null
  ) {
    score += ` (${tiebreakSelf}-${tiebreakOpponent})`;
  }
  return score;
}

export function determineWinner(match: Match): 'win' | 'loss' {
  let selfSets = 0;
  let opponentSets = 0;

  if (match.firstSetSelf !== null && match.firstSetOpponent !== null) {
    if (match.firstSetSelf > match.firstSetOpponent) selfSets++;
    else opponentSets++;
  }

  if (match.secondSetSelf !== null && match.secondSetOpponent !== null) {
    if (match.secondSetSelf > match.secondSetOpponent) selfSets++;
    else opponentSets++;
  }

  if (match.thirdSetSelf !== null && match.thirdSetOpponent !== null) {
    if (match.thirdSetSelf > match.thirdSetOpponent) selfSets++;
    else opponentSets++;
  }

  return selfSets > opponentSets ? 'win' : 'loss';
}
