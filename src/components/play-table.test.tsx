import { ColumnDef } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PlayTable from './play-table';

type Data = {
  id: number;
  name: string;
};

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: info => info.getValue(),
  },
];

const data: Data[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

describe('PlayTable', () => {
  it('renders table headers correctly', () => {
    render(<PlayTable data={data} columns={columns} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders table rows correctly', () => {
    render(<PlayTable data={data} columns={columns} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders "No results." when there is no data', () => {
    render(<PlayTable data={[]} columns={columns} />);
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });
});
