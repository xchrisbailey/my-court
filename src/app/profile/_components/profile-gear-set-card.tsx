import { Badge } from '@/components/ui/badge';
import { GearSetWithRelations } from '@/shared/types';

type Props = {
  gearSet: GearSetWithRelations;
};

export function ProfileGearSetCard({ gearSet }: Props) {
  return (
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
  );
}
