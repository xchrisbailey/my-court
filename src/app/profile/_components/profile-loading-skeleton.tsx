import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, ShoppingBag, Trophy } from 'lucide-react';

export default function ProfileLoadingSkeleton() {
  return (
    <div className="container p-4 mx-auto space-y-6">
      <Card>
        <CardContent className="flex items-center pt-6 space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-36 animate-pulse"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
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
              {[...Array(2)].map((_, index) => (
                <li
                  key={index}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                ></li>
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
              {[...Array(2)].map((_, index) => (
                <li
                  key={index}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                ></li>
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
            {[...Array(1)].map((_, index) => (
              <li
                key={index}
                className="h-12 bg-gray-200 rounded animate-pulse"
              ></li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
}
