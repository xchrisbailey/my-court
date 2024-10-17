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
                <li
                  key={match.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {match.organization.toUpperCase()} @ {match.location}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {new Date(match.playDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={'win' === 'win' ? 'default' : 'secondary'}>
                      WIN
                    </Badge>
                    <p className="text-sm">
                      {match.firstSetSelf}, {match.firstSetOpponent}
                    </p>
                    <p className="text-sm">
                      {match.secondSetSelf}, {match.secondSetOpponent}
                    </p>
                  </div>
                </li>
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
                <li
                  key={practice.id}
                  className="flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">{practice.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {practice.playDate}
                    </p>
                    <p className="text-sm">{`${practice.location}, ${practice.city}, ${practice.state}`}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {new Date(practice.playDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Badge>
                    {practice.notes && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {practice.notes}
                      </p>
                    )}
                  </div>
                </li>
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
              <li key={gearSet.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Racket</Badge>
                  <span className="font-medium">{gearSet.racket.model}</span>
                  <span className="text-muted-foreground">
                    by {gearSet.racket.brand.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">String</Badge>
                  <span className="font-medium">{gearSet.strings.model}</span>
                  <span className="text-muted-foreground">
                    by {gearSet.strings.brand.name}
                  </span>
                </div>
              </li>
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
