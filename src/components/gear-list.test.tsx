import { RacketWithRelations, StringWithRelations } from '@/shared/types';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RacketListCard, StringListCard } from './gear-list';

describe('StringListCard', () => {
  const mockString: StringWithRelations = {
    id: '1',
    model: 'Pro String',
    brandId: '1',
    createdAt: new Date('2023-01-01'),
    brand: {
      id: '1',
      name: 'BrandA',
      about: 'High-quality tennis strings',
      logoLink: 'https://example.com/logo.png',
      createdAt: new Date('2023-01-01'),
    },
    composition: 'Nylon',
    gauge: '16',
  };

  it('renders the string model', () => {
    const { getByText } = render(<StringListCard string={mockString} />);
    expect(getByText('Pro String')).toBeInTheDocument();
  });

  it('renders the string brand', () => {
    const { getByText } = render(<StringListCard string={mockString} />);
    expect(getByText(/BrandA/)).toBeInTheDocument();
  });

  it('renders the string composition', () => {
    const { getByText } = render(<StringListCard string={mockString} />);
    expect(getByText('Composition: Nylon')).toBeInTheDocument();
  });

  it('renders the string gauge', () => {
    const { getByText } = render(<StringListCard string={mockString} />);
    expect(getByText('Gauge: 16')).toBeInTheDocument();
  });

  it('has the correct link href', () => {
    const { container } = render(<StringListCard string={mockString} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/strings/1');
  });
});

describe('RacketListCard', () => {
  const mockRacket: RacketWithRelations = {
    id: '1',
    model: 'Pro Racket',
    brandId: '1',
    createdAt: new Date('2023-01-01'),
    brand: {
      id: '1',
      name: 'BrandA',
      about: 'High-quality tennis rackets',
      logoLink: 'https://example.com/logo.png',
      createdAt: new Date('2023-01-01'),
    },
    year: 2023,
    headSize: 100,
    stringPattern: '16x19',
    weight: 300,
    swingWeight: 320,
  };

  it('renders the racket model', () => {
    const { getByText } = render(<RacketListCard racket={mockRacket} />);
    expect(getByText('Pro Racket')).toBeInTheDocument();
  });

  it('renders the racket brand', () => {
    const { getByText } = render(<RacketListCard racket={mockRacket} />);
    expect(getByText(/BrandA/)).toBeInTheDocument();
  });

  it('renders the racket year', () => {
    const { getByText } = render(<RacketListCard racket={mockRacket} />);
    expect(getByText('Year: 2023')).toBeInTheDocument();
  });

  it('renders the racket head size', () => {
    const { getByText } = render(<RacketListCard racket={mockRacket} />);
    expect(getByText('Head Size: 100 sq in')).toBeInTheDocument();
  });

  it('has the correct link href', () => {
    const { container } = render(<RacketListCard racket={mockRacket} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/rackets/1');
  });
});
