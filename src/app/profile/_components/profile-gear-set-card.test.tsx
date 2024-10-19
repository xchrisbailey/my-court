import { GearSetWithRelations } from '@/shared/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfileGearSetCard } from './profile-gear-set-card';

describe('ProfileGearSetCard', () => {
  const mockGearSet: GearSetWithRelations = {
    id: '1',
    userId: 'user1',
    racketId: '1',
    stringId: '2',
    createdAt: new Date(),
    stringTensionMains: 55,
    stringTensionCrosses: 53,
    racket: {
      id: '1',
      model: 'Pro Staff',
      year: 2021,
      headSize: 97,
      stringPattern: '16x19',
      weight: 315,
      swingWeight: 290,
      brandId: '1',
      createdAt: new Date(),
      brand: {
        id: '1',
        name: 'Wilson',
        about: 'A leading brand in tennis equipment.',
        logoLink: 'https://example.com/wilson-logo.png',
        createdAt: new Date(),
      },
    },
    strings: {
      id: '2',
      model: 'RPM Blast',
      brandId: '2',
      createdAt: new Date(),
      gauge: '16',
      composition: 'Polyester',
      brand: {
        id: '2',
        name: 'Babolat',
        about: 'A renowned brand for tennis strings.',
        logoLink: 'https://example.com/babolat-logo.png',
        createdAt: new Date(),
      },
    },
  };

  it('renders racket information correctly', () => {
    render(<ProfileGearSetCard gearSet={mockGearSet} />);

    expect(screen.getByText('Racket')).toBeInTheDocument();
    expect(screen.getByText('Pro Staff')).toBeInTheDocument();
    expect(screen.getByText('by Wilson')).toBeInTheDocument();
  });

  it('renders string information correctly', () => {
    render(<ProfileGearSetCard gearSet={mockGearSet} />);

    expect(screen.getByText('String')).toBeInTheDocument();
    expect(screen.getByText('RPM Blast')).toBeInTheDocument();
    expect(screen.getByText('by Babolat')).toBeInTheDocument();
  });
});
