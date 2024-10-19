'use client';

import PlayTable from '@/components/play-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Match } from '@/shared/types';
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { deleteMatch } from '../actions';
import { matchOutcome } from '../utils';

type Props = {
  matchesPromise: Promise<Match[]>;
};

export default function MatchTable({ matchesPromise }: Props) {
  const matches = use(matchesPromise);

  const columns: ColumnDef<Match>[] = [
    {
      accessorKey: 'organization',
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.organization.toUpperCase()}
        </Badge>
      ),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Organization
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'location',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Location
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'city',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          City
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'state',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          State
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      ),
    },
    {
      id: 'playDate',
      accessorFn: match => new Date(match.playDate).toLocaleDateString(),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Play Date
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      ),
    },
    {
      id: 'outcome',
      accessorFn: match => matchOutcome(match),
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Outcome
          <ArrowUpDown className="ml-2 w-4 h-4" />
        </Button>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const match = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Link href={`/matches/${match.id}`} passHref legacyBehavior>
              <Button variant="ghost" size="icon" className="p-0 w-8 h-8">
                <a>
                  <span className="sr-only">View</span>
                  <Eye className="w-4 h-4" />
                </a>
              </Button>
            </Link>
            <Link href={`/matches/${match.id}/edit`} passHref legacyBehavior>
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
                  <h3 className="text-lg font-semibold">Delete Match</h3>
                  <p>Are you sure you want to delete this match?</p>
                  <div className="flex justify-end space-x-4">
                    <PopoverClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </PopoverClose>
                    <form action={deleteMatch}>
                      <input type="hidden" name="matchId" value={match.id} />
                      <Button variant="destructive">Delete</Button>
                    </form>
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

  return <PlayTable data={matches} columns={columns} />;
}
