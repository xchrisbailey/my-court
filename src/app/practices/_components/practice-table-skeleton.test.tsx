import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PracticeTableSkeleton } from './practice-table-skeleton';

describe('PracticeTableSkeleton', () => {
  it('renders the table headers correctly', () => {
    render(<PracticeTableSkeleton />);

    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByText('Play Date')).toBeInTheDocument();
  });

  it('renders the correct number of skeleton rows', () => {
    render(<PracticeTableSkeleton />);

    const skeletonRows = screen.getAllByRole('row');
    // 1 header row + 5 skeleton rows
    expect(skeletonRows).toHaveLength(6);
  });
});
