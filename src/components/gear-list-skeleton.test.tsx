import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GearListSkeleton from './gear-list-skeleton';

describe('GearListSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<GearListSkeleton />);
    expect(container).toBeInTheDocument();
  });

  it('renders the correct number of skeleton items', () => {
    const { container } = render(<GearListSkeleton />);
    const skeletonItems = container.querySelectorAll(
      '.h-full.p-4.bg-gray-200.animate-pulse.rounded-md',
    );
    expect(skeletonItems.length).toBe(6);
  });

  it('renders skeleton items with correct structure', () => {
    const { container } = render(<GearListSkeleton />);
    const skeletonItems = container.querySelectorAll(
      '.h-full.p-4.bg-gray-200.animate-pulse.rounded-md',
    );

    skeletonItems.forEach(item => {
      expect(
        item.querySelector('.mb-2.h-6.bg-gray-300.rounded.w-3\\/4'),
      ).toBeInTheDocument();

      const spaceY2Divs = item.querySelectorAll('.space-y-2 > div');
      expect(spaceY2Divs.length).toBe(3);

      expect(spaceY2Divs[0]).toHaveClass(
        'h-4',
        'bg-gray-300',
        'rounded',
        'w-full',
      );
      expect(spaceY2Divs[1]).toHaveClass(
        'h-4',
        'bg-gray-300',
        'rounded',
        'w-5/6',
      );
      expect(spaceY2Divs[2]).toHaveClass(
        'h-4',
        'bg-gray-300',
        'rounded',
        'w-2/3',
      );
    });
  });
});
