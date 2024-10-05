import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Match } from '@/shared/types';
import { useEffect, useState } from 'react';

type Props = {
  set: number;
  prevState?: Match | undefined;
};

export function SetScoreCard({ set, prevState }: Props) {
  const [selfScore, setSelfScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [setWinner, setSetWinner] = useState<
    'self' | 'opponent' | 'tiebreak' | 'draw'
  >('draw');

  useEffect(() => {
    if (selfScore > opponentScore) {
      setSetWinner('self');
    } else if (opponentScore > selfScore) {
      setSetWinner('opponent');
    } else if (opponentScore === 6 && selfScore === 6) {
      setSetWinner('tiebreak');
    } else {
      setSetWinner('draw');
    }
  }, [selfScore, opponentScore]);

  const setText = set === 1 ? 'first' : set === 2 ? 'second' : 'third';
  return (
    <div key={setText} className="p-4 space-y-4 rounded-md border">
      <h3 className="font-semibold">Set {set}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${setText}SetSelf`}>Your Score</Label>
          <Input
            type="number"
            id={`${setText}SetSelf`}
            name={`${setText}SetSelf`}
            min={0}
            max={7}
            defaultValue={prevState ? (prevState[`${setText}SetSelf`] ?? 0) : 0}
            required
            onChange={e => setSelfScore(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${setText}SetOpponent`}>Opponent Score</Label>
          <Input
            type="number"
            id={`${setText}SetOpponent`}
            name={`${setText}SetOpponent`}
            min={0}
            max={7}
            defaultValue={
              prevState ? (prevState[`${setText}SetOpponent`] ?? 0) : 0
            }
            required
            onChange={e => setOpponentScore(parseInt(e.target.value))}
          />
        </div>
        {setWinner === 'tiebreak' && (
          <>
            <div className="space-y-2">
              <Label htmlFor={`${setText}SetTieBreakSelf`}>
                Your Tie Break
              </Label>
              <Input
                type="number"
                id={`${setText}SetTieBreakSelf`}
                name={`${setText}SetTieBreakSelf`}
                min="0"
                defaultValue={
                  prevState ? (prevState[`${setText}SetTieBreakSelf`] ?? 0) : 0
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${setText}SetTieBreakOpponent`}>
                Opponent Tie Break
              </Label>
              <Input
                type="number"
                id={`${setText}SetTieBreakOpponent`}
                name={`${setText}SetTieBreakOpponent`}
                min="0"
                defaultValue={
                  prevState
                    ? (prevState[`${setText}SetTieBreakOpponent`] ?? 0)
                    : 0
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
