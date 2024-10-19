'use client';

import { Badge } from '@/components/ui/badge';
import { Match } from '@/shared/types';
import { determineWinner, formatScore } from '../utils';

type Props = {
  match: Match;
};

export function ProfileMatchCard({ match }: Props) {
  const result = determineWinner(match);
  return (
    <li key={match.id} className="flex justify-between items-start">
      <div>
        <p className="font-medium">{match.organization.toUpperCase()}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(match.playDate).toLocaleDateString()}
        </p>
        <p className="text-sm">{`${match.location}, ${match.city}, ${match.state}`}</p>
      </div>
      <div className="text-right">
        <Badge variant={result === 'win' ? 'default' : 'secondary'}>
          {result.toUpperCase()}
        </Badge>
        <p className="mt-1 text-sm">
          {formatScore(
            match.firstSetSelf,
            match.firstSetOpponent,
            match.firstSetTieBreakSelf,
            match.firstSetTieBreakOpponent,
          )}
        </p>
        <p className="text-sm">
          {formatScore(
            match.secondSetSelf,
            match.secondSetOpponent,
            match.secondSetTieBreakSelf,
            match.secondSetTieBreakOpponent,
          )}
        </p>
        {match.thirdSetSelf !== null && match.thirdSetOpponent !== null && (
          <p className="text-sm">
            {formatScore(
              match.thirdSetSelf,
              match.thirdSetOpponent,
              match.thirdSetTieBreakSelf,
              match.thirdSetTieBreakOpponent,
            )}
          </p>
        )}
      </div>
    </li>
  );
}
