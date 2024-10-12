import { PracticeWithRelations } from '@/shared/types';
import { render, screen, waitFor } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import PracticeCard from './practice-card';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('PracticeCard component', () => {
  const mockPractice: PracticeWithRelations = {
    type: 'Singles',
    playDate: '2023-10-01T00:00:00Z',
    location: 'Central Park',
    city: 'New York',
    state: 'NY',
    notes: '<p>Bring your own racket</p>',
    id: '1',
    userId: '1',
    gearId: null,
    createdAt: new Date(),
    gear: {
      id: '1',
      userId: '1',
      racketId: '1',
      stringId: '1',
      stringTensionMains: 55,
      stringTensionCrosses: 53,
      createdAt: new Date(),
      racket: {
        id: '1',
        brand: {
          id: '1',
          name: 'Wilson',
          about: 'A leading brand in tennis equipment',
          logoLink: 'https://example.com/wilson-logo.png',
          createdAt: new Date(),
        },
        model: 'Pro Staff',
        year: 2021,
        headSize: 97,
        stringPattern: '16x19',
        weight: 315,
        swingWeight: 290,
        brandId: '1',
        createdAt: new Date(),
      },
      strings: {
        id: '1',
        model: 'Alu Power',
        brandId: '2',
        createdAt: new Date(),
        gauge: '16L',
        composition: 'Polyester',
        brand: {
          id: '2',
          name: 'Luxilon',
          about: 'A leading brand in tennis strings',
          logoLink: 'https://example.com/luxilon-logo.png',
          createdAt: new Date(),
        },
      },
    },
    user: {
      id: '1',
      email: 'user@example.com',
      password: 'password123',
    },
  };
  it('renders correctly with valid data', async () => {
    render(<PracticeCard practicePromise={Promise.resolve(mockPractice)} />);

    await waitFor(() => {
      expect(screen.getByText('Tennis Practice')).toBeInTheDocument();
      expect(screen.getByText('Singles')).toBeInTheDocument();
      expect(screen.getByText('Central Park')).toBeInTheDocument();
      expect(screen.getByText('New York, NY')).toBeInTheDocument();
      expect(screen.getByText('Bring your own racket')).toBeInTheDocument();
    });
  });
  it('calls notFound when practice data is missing', async () => {
    render(<PracticeCard practicePromise={Promise.resolve(undefined)} />);

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });

  it('displays "No notes" when notes are missing', async () => {
    const mockPracticeWithoutNotes = {
      ...mockPractice,
      notes: null,
      id: '1',
      userId: '1',
      gearId: null,
      createdAt: new Date(),
    };

    render(
      <PracticeCard
        practicePromise={Promise.resolve(mockPracticeWithoutNotes)}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('No notes')).toBeInTheDocument();
    });
  });
});
