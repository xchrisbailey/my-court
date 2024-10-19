import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandsListSkeleton } from './brand-list-skeleton';

describe('BrandsListSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<BrandsListSkeleton />);
    expect(container).toBeInTheDocument();
  });

  it('renders a grid container', () => {
    const { container } = render(<BrandsListSkeleton />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
  });

  it('renders 4 BrandCardSkeleton components', () => {
    const { container } = render(<BrandsListSkeleton />);
    const skeletons = container.querySelectorAll('.grid > *');
    expect(skeletons.length).toBe(4);
  });
});
