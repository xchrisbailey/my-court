type Props = {
  gauge: string;
  composition: string;
};

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { gaugeToMM } from '@/lib/helpers';
import { Atom, Ruler } from 'lucide-react';

export default function StringSpecCard(props: Props) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Specs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Ruler className="mr-2 w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Gauge:</span>
            <span className="ml-auto">
              {props.gauge}/{gaugeToMM(props.gauge)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center">
            <Atom className="mr-2 w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Composition:</span>
            <span className="ml-auto">{props.composition}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
