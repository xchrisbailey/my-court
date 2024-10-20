import { Brand, Racket } from '@/shared/types';
import { render, screen, waitFor, within } from '@testing-library/react';
import { useActionState } from 'react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { RacketForm } from './racket-form';

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

describe('RacketForm', () => {
  const brands: Brand[] = [
    {
      id: '1',
      name: 'Brand A',
      about: 'About Brand A',
      logoLink: 'http://example.com/logoA.png',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Brand B',
      about: 'About Brand B',
      logoLink: 'http://example.com/logoB.png',
      createdAt: new Date(),
    },
  ];

  const racket: Racket = {
    id: '1',
    model: 'Model A',
    year: 2020,
    brandId: '1',
    headSize: 100,
    stringPattern: '16x19',
    weight: 300,
    swingWeight: 320,
    createdAt: new Date(),
  };

  const brandsPromise = Promise.resolve(brands);
  const targetRacketPromise = Promise.resolve(racket);

  beforeEach(() => {
    (useActionState as Mock).mockImplementation(mockUseActionState);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form for adding a new racket', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);

    render(<RacketForm page="new" brandsPromise={brandsPromise} />);

    await waitFor(() => {});

    expect(screen.getByPlaceholderText('enter model')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter year')).toBeInTheDocument();
    expect(screen.getByText('Select Brand')).toBeInTheDocument();
    expect(screen.getByText('Select Head Size')).toBeInTheDocument();
    expect(screen.getByText('Select String Pattern')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter racket weight (grams)'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter swing weight (grams)'),
    ).toBeInTheDocument();
  });

  it('renders the form for editing an existing racket', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);

    render(
      <RacketForm
        page="edit"
        targetRacketPromise={targetRacketPromise}
        brandsPromise={brandsPromise}
      />,
    );

    await waitFor(() => {});

    expect(screen.getByDisplayValue(racket.model)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(racket.year.toString()),
    ).toBeInTheDocument();

    const brandTrigger = screen.getByRole('combobox', { name: 'Select Brand' });
    expect(within(brandTrigger).getByText('Brand A')).toBeInTheDocument();

    const headSizeTrigger = screen.getByRole('combobox', {
      name: 'Select Head Size',
    });
    expect(
      within(headSizeTrigger).getByText(racket.headSize + 'in'),
    ).toBeInTheDocument();

    const stringPatternTrigger = screen.getByRole('combobox', {
      name: 'String Pattern',
    });
    expect(
      within(stringPatternTrigger).getByText(racket.stringPattern),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(racket.weight.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(racket.swingWeight.toString()),
    ).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    const errors = {
      model: ['Model is required'],
      year: ['Year is required'],
      brandId: ['Brand is required'],
      headSize: ['Head Size is required'],
      stringPattern: ['String Pattern is required'],
      weight: ['Weight is required'],
      swingWeight: ['Swing Weight is required'],
    };

    mockUseActionState.mockReturnValue([{ errors }, vi.fn(), false]);

    render(<RacketForm page="new" brandsPromise={brandsPromise} />);

    await waitFor(() => {});

    expect(screen.getByText('Model is required')).toBeInTheDocument();
    expect(screen.getByText('Year is required')).toBeInTheDocument();
    expect(screen.getByText('Brand is required')).toBeInTheDocument();
    expect(screen.getByText('Head Size is required')).toBeInTheDocument();
    expect(screen.getByText('String Pattern is required')).toBeInTheDocument();
    expect(screen.getByText('Weight is required')).toBeInTheDocument();
    expect(screen.getByText('Swing Weight is required')).toBeInTheDocument();
  });
});
