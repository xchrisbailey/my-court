import {
  GearSetWithRelations,
  RacketWithRelations,
  StringWithRelations,
} from '@/shared/types';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { GearSetForm } from './gear-set-form';

vi.mock('../actions', () => ({
  addGearSet: vi.fn(),
  editGearSet: vi.fn(),
}));

const mockRackets: RacketWithRelations[] = [
  {
    id: '1',
    brand: {
      id: '1',
      name: 'BrandA',
      about: 'About BrandA',
      logoLink: 'linkA',
      createdAt: null,
    },
    model: 'ModelA',
    year: 2020,
    headSize: 100,
    stringPattern: '16x19',
    weight: 300,
    swingWeight: 320,
    brandId: '1',
    createdAt: null,
  },
  {
    id: '2',
    brand: {
      id: '2',
      name: 'BrandB',
      about: 'About BrandB',
      logoLink: 'linkB',
      createdAt: null,
    },
    model: 'ModelB',
    year: 2021,
    headSize: 98,
    stringPattern: '18x20',
    weight: 305,
    swingWeight: 325,
    brandId: '2',
    createdAt: null,
  },
];

const mockStrings: StringWithRelations[] = [
  {
    id: '1',
    brand: {
      id: '1',
      name: 'BrandX',
      about: 'About BrandX',
      logoLink: 'linkX',
      createdAt: null,
    },
    model: 'ModelX',
    brandId: '1',
    createdAt: null,
    gauge: '16',
    composition: 'Polyester',
  },
  {
    id: '2',
    brand: {
      id: '2',
      name: 'BrandY',
      about: 'About BrandY',
      logoLink: 'linkY',
      createdAt: null,
    },
    model: 'ModelY',
    brandId: '2',
    createdAt: null,
    gauge: '17',
    composition: 'Nylon',
  },
];

const mockGearSet: GearSetWithRelations = {
  id: '1',
  createdAt: null,
  userId: 'user1',
  racketId: '1',
  stringId: '1',
  stringTensionMains: 50,
  stringTensionCrosses: 50,
  racket: {
    id: '1',
    brand: {
      id: '1',
      name: 'BrandA',
      about: 'About BrandA',
      logoLink: 'linkA',
      createdAt: null,
    },
    model: 'ModelA',
    year: 2020,
    headSize: 100,
    stringPattern: '16x19',
    weight: 300,
    swingWeight: 320,
    brandId: '1',
    createdAt: null,
  },
  strings: {
    id: '1',
    brand: {
      id: '1',
      name: 'BrandX',
      about: 'About BrandX',
      logoLink: 'linkX',
      createdAt: null,
    },
    model: 'ModelX',
    gauge: '16',
    composition: 'Polyester',
    brandId: '1',
    createdAt: null,
  },
};

describe('GearSetForm', () => {
  it('renders the form for creating a new gear set', async () => {
    render(
      <GearSetForm
        page="new"
        racketsPromise={Promise.resolve(mockRackets)}
        stringsPromise={Promise.resolve(mockStrings)}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Create A Gear Set')).toBeInTheDocument();
    });

    expect(screen.getByText('Select Racket')).toBeInTheDocument();
    expect(screen.getByText('Select Strings')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('set tensions for mains'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('set tensions for crosses'),
    ).toBeInTheDocument();
  });

  it('renders the form for editing an existing gear set', async () => {
    render(
      <GearSetForm
        page="edit"
        racketsPromise={Promise.resolve(mockRackets)}
        stringsPromise={Promise.resolve(mockStrings)}
        targetGearSet={Promise.resolve(mockGearSet)}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Gear Set')).toBeInTheDocument();
    });

    expect(screen.getAllByDisplayValue('50')).length.greaterThan(1);
  });
});
