import { Badge } from '@/components/ui/badge';
import { Practice } from '@/shared/types';

type Props = {
  practice: Practice;
};

export function ProfilePracticeCard({ practice }: Props) {
  return (
    <li key={practice.id} className="flex justify-between items-start">
      <div>
        <p className="font-medium">{practice.type}</p>
        <p className="text-sm text-muted-foreground">{practice.playDate}</p>
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
          <p className="mt-1 text-xs text-muted-foreground">{practice.notes}</p>
        )}
      </div>
    </li>
  );
}
