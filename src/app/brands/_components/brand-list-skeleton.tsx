import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function BrandsListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <BrandCardSkeleton key={index} />
      ))}
    </div>
  );
}

function BrandCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-4 items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
      </CardContent>
    </Card>
  );
}
