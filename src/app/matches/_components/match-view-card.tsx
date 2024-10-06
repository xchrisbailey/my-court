'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MatchWithRelations } from '@/shared/types';
import { notFound } from 'next/navigation';
import { use } from 'react';

type ScoreDisplayProps = {
  selfScore: number;
  opponentScore: number;
  setNumber: number;
  selfTiebreak?: number | null | undefined;
  opponentTiebreak?: number | null | undefined;
};

export const ScoreDisplay = ({
  selfScore,
  opponentScore,
  setNumber,
  selfTiebreak,
  opponentTiebreak,
}: ScoreDisplayProps) => (
  <div className="flex flex-col justify-center items-center">
    <span className="mb-1 text-sm font-medium text-muted-foreground">
      Set {setNumber}
    </span>
    <span className="text-lg font-bold">
      {selfScore}-{opponentScore}
    </span>
    {selfTiebreak && opponentTiebreak ? (
      <span className="text-sm text-muted-foreground">
        ({selfTiebreak}-{opponentTiebreak})
      </span>
    ) : (
      <span className="text-sm text-muted-foreground">(0-0)</span>
    )}
  </div>
);

type Props = {
  matchPromise: Promise<MatchWithRelations | undefined>;
};

export default function MatchViewCard({ matchPromise }: Props) {
  const match = use(matchPromise);
  if (!match) notFound();
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Match Result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Self</h2>
          <h2 className="text-xl font-semibold">Opponent</h2>
        </div>
        <div className="flex gap-10 justify-center">
          {match.firstSetSelf && match.firstSetOpponent ? (
            <div className="flex justify-around">
              <ScoreDisplay
                setNumber={1}
                selfScore={match.firstSetSelf}
                opponentScore={match.firstSetOpponent}
                selfTiebreak={match.firstSetTieBreakSelf}
                opponentTiebreak={match.firstSetTieBreakOpponent}
              />
            </div>
          ) : null}
          {match.secondSetSelf && match.secondSetOpponent ? (
            <div className="flex justify-around">
              <ScoreDisplay
                setNumber={2}
                selfScore={match.secondSetSelf}
                opponentScore={match.secondSetOpponent}
                selfTiebreak={match.secondSetTieBreakSelf}
                opponentTiebreak={match.secondSetTieBreakOpponent}
              />
            </div>
          ) : null}
          {match.thirdSetSelf && match.thirdSetOpponent ? (
            <div className="flex justify-around">
              <ScoreDisplay
                setNumber={3}
                selfScore={match.thirdSetSelf}
                opponentScore={match.thirdSetOpponent}
                selfTiebreak={match.thirdSetTieBreakSelf}
                opponentTiebreak={match.thirdSetTieBreakOpponent}
              />
            </div>
          ) : null}
        </div>
        <Separator />
        <div className="space-y-2">
          <p>
            <strong>Location:</strong> {match.location}, {match.city},{' '}
            {match.state}
          </p>
          <div>
            <strong>Organization:</strong>{' '}
            <Badge variant="secondary">
              {match.organization.toUpperCase()}
            </Badge>
          </div>
          <p>
            <strong>Date:</strong>{' '}
            {new Date(match.playDate).toLocaleDateString()}
          </p>
        </div>
        {match.notes && (
          <>
            <Separator />
            <div>
              <h3 className="mb-2 font-semibold">Notes:</h3>
              <div dangerouslySetInnerHTML={{ __html: match.notes }} />
            </div>
          </>
        )}
        <Separator />
        <div>
          <h3 className="mb-2 font-semibold">Gear Used:</h3>
          <p>
            <strong>Racket: </strong>
            {match.gear.racket.brand.name} {match.gear.racket.model}
          </p>
          <p>
            <strong>Strings: </strong>
            {match.gear.strings.brand.name} {match.gear.strings.model}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
