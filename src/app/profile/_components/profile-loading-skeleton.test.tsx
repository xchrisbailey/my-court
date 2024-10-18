import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProfileLoadingSkeleton from './profile-loading-skeleton';

describe('ProfileLoadingSkeleton', () => {
  it('renders the profile loading skeleton correctly', () => {
    render(
      <main>
        <ProfileLoadingSkeleton />
      </main>,
    );

    // Check for the main container
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();

    // Check for the profile picture skeleton
    const profilePictureSkeleton = container.querySelector(
      '.w-24.h-24.bg-gray-200.rounded-full.animate-pulse',
    );
    expect(profilePictureSkeleton).toBeInTheDocument();

    // Check for the name skeleton
    const nameSkeleton = container.querySelector(
      '.h-6.bg-gray-200.rounded.w-36.animate-pulse',
    );
    expect(nameSkeleton).toBeInTheDocument();

    // Check for the subtitle skeleton
    const subtitleSkeleton = container.querySelector(
      '.mt-2.h-4.bg-gray-200.rounded.w-24.animate-pulse',
    );
    expect(subtitleSkeleton).toBeInTheDocument();

    // Check for the Recent Matches skeletons
    const recentMatchesSkeletons = container.querySelectorAll(
      '.h-12.bg-gray-200.rounded.animate-pulse',
    );
    expect(recentMatchesSkeletons.length).toBeGreaterThanOrEqual(5); // 2 for matches, 2 for practices, 1 for gear

    // Check for the button skeleton
    const buttonSkeleton = container.querySelector(
      '.h-10.bg-gray-200.rounded.w-32.animate-pulse',
    );
    expect(buttonSkeleton).toBeInTheDocument();
  });
});
