import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { GearSetWithRacketAndString } from '@/shared/types';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { deleteGearSet } from '../actions';

interface TennisGearProps {
  display: 'view' | 'list';
  gear: GearSetWithRacketAndString;
}

export function GearSetCard({ gear, display }: TennisGearProps) {
  return (
    <Card
      className={cn(
        'mx-auto w-full ',
        display === 'view' && 'md:max-w-lg',
        display === 'list' && 'max-w-sm',
      )}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-2xl font-bold">
          Gear Setup
          <span className="flex gap-2 justify-end items-center">
            <Button asChild variant="secondary" size="icon" className="w-7 h-7">
              <Link href={`/gearSets/${gear.id}/edit`}>
                <Pencil className="w-4 h-4" />
              </Link>
            </Button>
            <form action={deleteGearSet}>
              <input type="hidden" value={gear.id} name="gearSetId" />
              <Button variant="destructive" size="icon" className="w-7 h-7">
                <Trash className="w-4 h-4" />
              </Button>
            </form>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Racket</h3>
            <p className="text-base font-semibold">{gear.racket.model}</p>
            <p className="text-sm text-muted-foreground">
              {gear.racket.brand.name}
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-bold">Strings</h3>
            <p className="text-base font-semibold">{gear.strings.model}</p>
            <p className="text-sm text-muted-foreground">
              {gear.strings.brand.name}
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-lg font-semibold">String Tension</h3>
            <div className="flex gap-10 justify-start items-center">
              <div>
                <Badge variant="secondary">Mains</Badge>
                <span className="ml-2 text-sm">
                  {gear.stringTensionMains} lbs
                </span>
              </div>
              <div>
                <Badge variant="secondary">Crosses</Badge>
                <span className="ml-2 text-sm">
                  {gear.stringTensionCrosses} lbs
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
