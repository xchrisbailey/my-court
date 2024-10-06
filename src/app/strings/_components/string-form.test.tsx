import { Brand, String } from '@/shared/types';
import { render, screen, waitFor, within } from '@testing-library/react';
import { useActionState } from 'react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { StringForm } from './string-form';

vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useActionState: vi.fn(),
    forwardRef: actualReact.forwardRef,
  };
});

const mockUseActionState = vi.fn();

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}

// eslint-disable-next-line
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

vi.mock('../actions', () => ({
  addString: vi.fn(),
  editString: vi.fn(),
}));

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Brand A',
    about: 'About Brand A',
    logoLink: 'link-to-logo-A',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Brand B',
    about: 'About Brand B',
    logoLink: 'link-to-logo-B',
    createdAt: new Date(),
  },
];

const mockString: String = {
  id: '1',
  model: 'Model A',
  gauge: '16',
  composition: 'polyester',
  brandId: '1',
  createdAt: new Date(),
};

describe('StringForm', () => {
  const brandsPromise = Promise.resolve(mockBrands);
  const targetStringPromise = Promise.resolve(mockString);

  beforeEach(() => {
    (useActionState as Mock).mockImplementation(mockUseActionState);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form for adding a new string', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);

    render(<StringForm page="new" brandsPromise={brandsPromise} />);

    await waitFor(() => {
      expect(screen.getByText('Add String')).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText('enter model')).toBeInTheDocument();
    expect(screen.getByText('Select Gauge')).toBeInTheDocument();
    expect(screen.getByText('Select String Material')).toBeInTheDocument();
    expect(screen.getByText('Select Brand')).toBeInTheDocument();
  });

  it('renders the form for editing an existing string', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);

    render(
      <StringForm
        page="edit"
        targetStringPromise={targetStringPromise}
        brandsPromise={brandsPromise}
      />,
    );

    await waitFor(() => {});

    expect(screen.getByDisplayValue(mockString.model)).toBeInTheDocument();
    const gaugeTrigger = screen.getByRole('combobox', { name: 'Select Gauge' });
    expect(
      within(gaugeTrigger).getByText(mockString.gauge),
    ).toBeInTheDocument();

    const compositionTrigger = screen.getByRole('combobox', {
      name: 'Select String Material',
    });
    expect(
      within(compositionTrigger).getByText(mockString.composition),
    ).toBeInTheDocument();

    const brandTrigger = screen.getByRole('combobox', { name: 'Select Brand' });
    expect(within(brandTrigger).getByText('Brand A')).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    const errors = {
      model: ['Model is required'],
      gauge: ['Gauge is required'],
      composition: ['Composition is required'],
      brandId: ['Brand is required'],
    };

    mockUseActionState.mockReturnValue([{ errors }, vi.fn(), false]);

    render(<StringForm page="new" brandsPromise={brandsPromise} />);

    await waitFor(() => {});

    expect(screen.getByText('Model is required')).toBeInTheDocument();
    expect(screen.getByText('Gauge is required')).toBeInTheDocument();
    expect(screen.getByText('Composition is required')).toBeInTheDocument();
    expect(screen.getByText('Brand is required')).toBeInTheDocument();
  });
});
