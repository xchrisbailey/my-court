import { Match } from '@/shared/types';

function checkSetOutcome(
  selfScore: number,
  opponentScore: number,
  selfTieBreak: number,
  opponentTieBreak: number,
): number {
  if (selfTieBreak > 0 || opponentTieBreak > 0) {
    return selfTieBreak > opponentTieBreak
      ? 1
      : opponentTieBreak > selfTieBreak
        ? -1
        : 0;
  }

  return selfScore > opponentScore ? 1 : opponentScore > selfScore ? -1 : 0;
}

export function matchOutcome(match: Match): string {
  let selfSetWins = 0;
  let opponentSetWins = 0;

  const sets = [
    {
      self: match.firstSetSelf,
      opponent: match.firstSetOpponent,
      selfTieBreak: match.firstSetTieBreakSelf,
      opponentTieBreak: match.firstSetTieBreakOpponent,
    },
    {
      self: match.secondSetSelf,
      opponent: match.secondSetOpponent,
      selfTieBreak: match.secondSetTieBreakSelf,
      opponentTieBreak: match.secondSetTieBreakOpponent,
    },
    {
      self: match.thirdSetSelf,
      opponent: match.thirdSetOpponent,
      selfTieBreak: match.thirdSetTieBreakSelf,
      opponentTieBreak: match.thirdSetTieBreakOpponent,
    },
  ];

  for (const set of sets) {
    const outcome = checkSetOutcome(
      set.self ?? 0,
      set.opponent ?? 0,
      set.selfTieBreak ?? 0,
      set.opponentTieBreak ?? 0,
    );
    if (outcome === 1) {
      selfSetWins++;
    } else if (outcome === -1) {
      opponentSetWins++;
    }

    if (selfSetWins === 2) return 'Win';
    if (opponentSetWins === 2) return 'Loss';
  }

  return 'Draw';
}
