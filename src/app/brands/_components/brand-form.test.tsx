import { Brand } from '@/shared/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { useActionState } from 'react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { BrandForm } from './brand-form';

// Mock the useActionState hook
vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useActionState: vi.fn(),
    forwardRef: actualReact.forwardRef,
  };
});

const mockUseActionState = vi.fn();

describe('BrandForm', () => {
  const mockBrand: Brand = {
    id: '1',
    name: 'Test Brand',
    logoLink: 'http://example.com/logo.png',
    about: 'This is a test brand',
    createdAt: null,
  };

  beforeEach(() => {
    (useActionState as Mock).mockImplementation(mockUseActionState);
  });

  it('renders Add Brand form correctly', () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);
    render(<BrandForm page="new" />);

    expect(screen.getByText('Add Brand')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter brand name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter brand image url'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('short blub about this company'),
    ).toBeInTheDocument();
    expect(screen.getByText('add')).toBeInTheDocument();
  });

  it('renders Edit Brand form correctly', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);
    render(
      <BrandForm page="edit" targetBrandPromise={Promise.resolve(mockBrand)} />,
    );

    // Wait for the promise to resolve
    await screen.findByText(`Edit ${mockBrand.name}`);

    expect(screen.getByText(`Edit ${mockBrand.name}`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter brand name')).toHaveValue(
      mockBrand.name,
    );
    expect(screen.getByPlaceholderText('Enter brand image url')).toHaveValue(
      mockBrand.logoLink,
    );
    expect(
      screen.getByPlaceholderText('short blub about this company'),
    ).toHaveValue(mockBrand.about);
    expect(screen.getByText('edit')).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    mockUseActionState.mockReturnValue([
      { errors: { name: ['Name is required'] } },
      vi.fn(),
      false,
    ]);

    render(<BrandForm page="new" />);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('disables button when pending', () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), true]);

    render(<BrandForm page="new" />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('submits the form', () => {
    const mockAction = vi.fn();
    mockUseActionState.mockReturnValue([{ errors: {} }, mockAction, false]);

    render(<BrandForm page="new" />);

    fireEvent.change(screen.getByPlaceholderText('enter brand name'), {
      target: { value: 'New Brand' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter brand image url'), {
      target: { value: 'http://example.com/new-logo.png' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('short blub about this company'),
      { target: { value: 'This is a new brand' } },
    );

    fireEvent.click(screen.getByText('add'));

    expect(mockAction).toHaveBeenCalled();
  });
});
