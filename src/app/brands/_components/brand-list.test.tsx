import { Brand } from '@/shared/types';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrandCard, BrandsList } from './brand-list';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Brand One',
    logoLink: 'http://test.com/logo1.png',
    about: 'About Brand One',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Brand Two',
    logoLink: 'http://test.com/logo2.png',
    about: 'About Brand Two',
    createdAt: new Date('2023-01-02'),
  },
];

describe('BrandsList', () => {
  it('renders "No Brands Found Yet" when there are no brands', async () => {
    const brandsPromise = Promise.resolve([]);
    render(<BrandsList brandsPromise={brandsPromise} />);
    const noBrandsMessage = await screen.findByText('No Brands Found Yet');
    expect(noBrandsMessage).toBeInTheDocument();
  });

  it('renders a list of brands', async () => {
    const brandsPromise = Promise.resolve(mockBrands);
    render(<BrandsList brandsPromise={brandsPromise} />);
    const brandOne = await screen.findByText('Brand One');
    const brandTwo = await screen.findByText('Brand Two');
    expect(brandOne).toBeInTheDocument();
    expect(brandTwo).toBeInTheDocument();
  });
});

describe('BrandCard', () => {
  it('renders brand details correctly', async () => {
    const brand = mockBrands[0];
    render(<BrandCard brand={brand} />);
    await waitFor(() => {});
    const brandName = screen.getByText(brand.name);
    const brandAbout = screen.getByText(brand.about);
    const brandLogo = screen.getByText('B');
    expect(brandName).toBeInTheDocument();
    expect(brandAbout).toBeInTheDocument();
    expect(brandLogo).toBeInTheDocument();
  });
});
