import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { gramsToOunces, squareInchesToSquareCentimeters } from '@/lib/helpers';
import { Grid, Maximize2, Scale, Weight } from 'lucide-react';

type Props = {
  headSize: string;
  stringPattern: string;
  weight: number;
  swingWeight: number;
};

export default function RacketSpecCard(props: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Specs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Scale className="mr-2 w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Swing Weight:</span>
            <span className="ml-auto">{props.swingWeight} kg/cm²</span>
          </div>
          <Separator />
          <div className="flex items-center">
            <Weight className="mr-2 w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Weight:</span>
            <span className="ml-auto">
              {props.weight}g ({gramsToOunces(props.weight)} oz)
            </span>
          </div>
          <Separator />
          <div className="flex items-center">
            <Maximize2 className="mr-2 w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Head Size:</span>
            <span className="ml-auto">
              {props.headSize} in² (
              {squareInchesToSquareCentimeters(parseInt(props.headSize))} cm²)
            </span>
          </div>
          <Separator />
          <div className="flex items-center">
            <Grid className="mr-2 w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">String Pattern:</span>
            <span className="ml-auto">{props.stringPattern}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
