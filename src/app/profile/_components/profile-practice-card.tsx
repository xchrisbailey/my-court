import { Practice } from '@/shared/types';

type Props = {
  practice: Practice;
};

export function ProfilePracticeCard({ practice }: Props) {
  return (
    <li key={practice.id} className="flex justify-between items-start">
      <div>
        <p className="font-medium">{practice.type}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(practice.playDate).toLocaleDateString()}
        </p>
        <p className="text-sm">{`${practice.location}, ${practice.city}, ${practice.state}`}</p>
      </div>
      {/* <div className="text-right">
        <Badge variant="outline">
          {new Date(practice.playDate).toLocaleDateString()}
        </Badge>
        {practice.notes && (
          <p className="mt-1 text-xs text-muted-foreground">{practice.notes}</p>
        )}
      </div> */}
    </li>
  );
}
