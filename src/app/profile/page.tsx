import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { users } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';
import { Dumbbell, ShoppingBag, Trophy } from 'lucide-react';
import { redirect } from 'next/navigation';
import { ProfileGearSetCard } from './_components/profile-gear-set-card';
import { ProfileMatchCard } from './_components/profile-match-card';
import { ProfilePracticeCard } from './_components/profile-practice-card';

export default async function ProfilePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/login');
  }

  const userWithRelations = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    with: {
      matches: {
        limit: 2,
      },
      practices: {
        limit: 2,
      },
      gearSets: {
        limit: 1,
        with: {
          racket: {
            with: {
              brand: true,
            },
          },
          strings: {
            with: {
              brand: true,
            },
          },
        },
      },
    },
  });

  if (!userWithRelations) {
    return redirect('/login');
  }

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
              {userWithRelations.matches.map(match => (
                <ProfileMatchCard match={match} key={match.id} />
              ))}
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
              {userWithRelations.practices.map(practice => (
                <ProfilePracticeCard practice={practice} key={practice.id} />
              ))}
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
            {userWithRelations.gearSets.map(gearSet => (
              <ProfileGearSetCard gearSet={gearSet} key={gearSet.id} />
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}
