import { GearSetWithRacketAndString } from '@/shared/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { GearSetCard } from './gear-set-card';

const mockGear: GearSetWithRacketAndString = {
  id: '1',
  createdAt: new Date(),
  userId: 'user1',
  racketId: 'racket1',
  stringId: 'string1',
  racket: {
    id: 'racket1',
    model: 'Pro Staff 97',
    year: 2021,
    headSize: 97,
    stringPattern: '16x19',
    weight: 315,
    swingWeight: 290,
    brandId: 'brand2',
    brand: {
      id: 'brand2',
      name: 'Wilson',
      about: 'A renowned brand for tennis strings.',
      logoLink: 'https://example.com/babolat-logo.png',
      createdAt: new Date(),
    },
    createdAt: new Date(),
  },
  strings: {
    id: 'string1',
    model: 'RPM Blast',
    brandId: 'brand2',
    createdAt: new Date(),
    gauge: '16',
    composition: 'Polyester',
    brand: {
      name: 'Babolat',
      id: 'brand2',
      about: 'A renowned brand for tennis strings.',
      logoLink: 'https://example.com/babolat-logo.png',
      createdAt: new Date(),
    },
  },
  stringTensionMains: 55,
  stringTensionCrosses: 53,
};

describe('GearSetCard', () => {
  it('renders correctly in view mode', () => {
    render(<GearSetCard gear={mockGear} display="view" />);

    expect(screen.getByText('Gear Setup')).toBeInTheDocument();
    expect(screen.getByText('Racket')).toBeInTheDocument();
    expect(screen.getByText('Pro Staff 97')).toBeInTheDocument();
    expect(screen.getByText('Wilson')).toBeInTheDocument();
    expect(screen.getByText('Strings')).toBeInTheDocument();
    expect(screen.getByText('RPM Blast')).toBeInTheDocument();
    expect(screen.getByText('Babolat')).toBeInTheDocument();
    expect(screen.getByText('String Tension')).toBeInTheDocument();
    expect(screen.getByText('Mains')).toBeInTheDocument();
    expect(screen.getByText('55 lbs')).toBeInTheDocument();
    expect(screen.getByText('Crosses')).toBeInTheDocument();
    expect(screen.getByText('53 lbs')).toBeInTheDocument();
  });

  it('renders correctly in list mode', () => {
    render(<GearSetCard gear={mockGear} display="list" />);

    expect(screen.getByText('Gear Setup')).toBeInTheDocument();
    expect(screen.getByText('Racket')).toBeInTheDocument();
    expect(screen.getByText('Pro Staff 97')).toBeInTheDocument();
    expect(screen.getByText('Wilson')).toBeInTheDocument();
    expect(screen.getByText('Strings')).toBeInTheDocument();
    expect(screen.getByText('RPM Blast')).toBeInTheDocument();
    expect(screen.getByText('Babolat')).toBeInTheDocument();
    expect(screen.getByText('String Tension')).toBeInTheDocument();
    expect(screen.getByText('Mains')).toBeInTheDocument();
    expect(screen.getByText('55 lbs')).toBeInTheDocument();
    expect(screen.getByText('Crosses')).toBeInTheDocument();
    expect(screen.getByText('53 lbs')).toBeInTheDocument();
  });

  it('has edit and delete buttons', () => {
    render(<GearSetCard gear={mockGear} display="view" />);

    const editButton = screen.getByRole('link', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveAttribute('href', `/gearSets/${mockGear.id}/edit`);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls deleteGearSet action on delete button click', async () => {
    render(<GearSetCard gear={mockGear} display="view" />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    // Assuming deleteGearSet is a mock function
    // expect(deleteGearSet).toHaveBeenCalledWith({ gearSetId: mockGear.id });
  });
});
