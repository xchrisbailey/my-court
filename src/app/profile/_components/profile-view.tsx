'use client';

import { ProfileGearSetCard } from '@/app/profile/_components/profile-gear-set-card';
import { ProfileMatchCard } from '@/app/profile/_components/profile-match-card';
import { ProfilePracticeCard } from '@/app/profile/_components/profile-practice-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserWithRelations } from '@/shared/types';
import { Badge, Dumbbell, ShoppingBag, Trophy } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use } from 'react';

type Props = {
  userPromise: Promise<UserWithRelations | undefined>;
};

export function ProfileView({ userPromise }: Props) {
  const user = use(userPromise);
  if (!user) notFound();

  return (
    <div className="container p-4 mx-auto space-y-6">
      <Card>
        <CardContent className="flex items-center pt-6 space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={'/robotar.svg'} alt={'chris bailey'} />
            <AvatarFallback>
              {'chris bailey'
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Chris Bailey</h1>
            {/* <p className="text-muted-foreground">@{user.username}</p> */}
            <Badge className="mt-2">Rank #1</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2" />
              Recent Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {user.matches
                ? user.matches.map(match => (
                    <ProfileMatchCard match={match} key={match.id} />
                  ))
                : null}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="mr-2" />
              Recent Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {user.practices
                ? user.practices.map(practice => (
                    <ProfilePracticeCard
                      practice={practice}
                      key={practice.id}
                    />
                  ))
                : null}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingBag className="mr-2" /> My Gear
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {user.gearSets
              ? user.gearSets.map(gearSet => (
                  <ProfileGearSetCard gearSet={gearSet} key={gearSet.id} />
                ))
              : null}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}
