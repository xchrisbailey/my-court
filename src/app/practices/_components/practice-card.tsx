'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PracticeWithRelations } from '@/shared/types';
import { notFound } from 'next/navigation';
import { use } from 'react';

type Props = {
  practicePromise: Promise<PracticeWithRelations | undefined>;
};

export default function PracticeCard({ practicePromise }: Props) {
  const practice = use(practicePromise);
  if (!practice) notFound();

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Tennis Practice</span>
          <Badge>{practice.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Date</h3>
            <p>{new Date(practice.playDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{practice.location}</p>
            <p>{`${practice.city}, ${practice.state}`}</p>
          </div>
          <div>
            <h3 className="font-semibold">Notes</h3>
            {practice.notes ? (
              <div
                className="max-w-none prose prose-sm"
                dangerouslySetInnerHTML={{ __html: practice.notes }}
              />
            ) : (
              <p>No notes</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
