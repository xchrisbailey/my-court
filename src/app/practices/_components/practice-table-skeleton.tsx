import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function PracticeTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Play Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
