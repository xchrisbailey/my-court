'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Practice } from '@/shared/types';
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useState, useTransition } from 'react';
import { deletePractice } from '../actions';

type Props = {
  practicesPromise: Promise<Practice[]>;
};

export default function PracticeTable({ practicesPromise }: Props) {
  const router = useRouter();
  const practices = use(practicesPromise);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isPending, startTransition] = useTransition();

  const columns: ColumnDef<Practice>[] = [
    {
      accessorKey: 'type',
      cell: ({ row }) => {
        return (
          <Badge variant="secondary">{row.original.type.toUpperCase()}</Badge>
        );
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Type
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'location',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Location
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'city',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            City
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'state',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            State
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
    },
    {
      // accessorKey: 'playDate',
      id: 'playDate',
      accessorFn: practice => new Date(practice.playDate).toLocaleDateString(),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Play Date
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const practice = row.original;

        const handleDelete = (practiceId: string) => {
          startTransition(async () => {
            await deletePractice(practiceId);
            router.refresh();
          });
        };

        return (
          <div className="flex items-center space-x-2">
            <Link href={`/practices/${practice.id}`} passHref legacyBehavior>
              <Button variant="ghost" size="icon" className="p-0 w-8 h-8">
                <a>
                  <span className="sr-only">View</span>
                  <Eye className="w-4 h-4" />
                </a>
              </Button>
            </Link>
            <Link
              href={`/practices/${practice.id}/edit`}
              passHref
              legacyBehavior
            >
              <Button variant="ghost" size="icon" className="p-0 w-8 h-8">
                <a>
                  <span className="sr-only">Edit</span>
                  <Edit className="w-4 h-4" />
                </a>
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0 w-8 h-8">
                  <span className="sr-only">Delete</span>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mr-5 rounded border bg-popover">
                <div className="p-4 space-y-4">
                  <h3 className="text-lg font-semibold">Delete Practice</h3>
                  <p>Are you sure you want to delete this practice?</p>
                  <div className="flex justify-end space-x-4">
                    <PopoverClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </PopoverClose>
                    <Button variant="destructive" onClick={() => handleDelete(practice.id)} >
                      {isPending ? 'Deleting...' : 'Delete'}

                    </Button>

                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
      header: '',
    },
  ];

  const table = useReactTable({
    data: practices,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
