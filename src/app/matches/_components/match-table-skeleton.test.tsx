import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MatchTableSkeleton } from './match-table-skeleton';

describe('MatchTableSkeleton', () => {
  it('renders the table headers correctly', () => {
    render(<MatchTableSkeleton />);

    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByText('Play Date')).toBeInTheDocument();
    expect(screen.getByText('Outcome')).toBeInTheDocument();
  });

  it('renders the correct number of skeleton rows', () => {
    render(<MatchTableSkeleton />);

    const skeletonRows = screen.getAllByRole('row');
    // 1 header row + 5 skeleton rows
    expect(skeletonRows).toHaveLength(6);
  });
});
