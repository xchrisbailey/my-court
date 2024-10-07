import { GearSetWithRacketAndString, Practice } from '@/shared/types';
import { render, screen, waitFor, within } from '@testing-library/react';
import { useActionState } from 'react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { PracticeForm } from './practice-form';

// Mock the necessary modules
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: vi.fn(),
  };
});

vi.mock('@/app/practices/actions', () => ({
  addPractice: vi.fn(),
  editPractice: vi.fn(),
}));

vi.mock('next/dynamic', () => ({
  default: () => () => 'Mocked ReactQuill',
}));

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

const mockGear: GearSetWithRacketAndString[] = [
  {
    id: 'gear1',
    userId: 'user1',
    racketId: 'racket1',
    createdAt: new Date(),
    stringId: 'string1',
    stringTensionMains: 50,
    stringTensionCrosses: 48,
    racket: {
      id: 'racket1',
      model: 'Test Racket',
      year: 2023,
      headSize: 100,
      stringPattern: '16x19',
      weight: 300,
      swingWeight: 320,
      brandId: 'brand1',
      createdAt: new Date(),
      brand: {
        id: 'brand1',
        name: 'Test Brand',
        about: 'Test Brand Description',
        logoLink: 'https://example.com/logo.png',
        createdAt: new Date(),
      },
    },
    strings: {
      id: 'string1',
      model: 'Test String',
      brandId: 'brand1',
      createdAt: new Date(),
      gauge: '16',
      composition: 'Polyester',
      brand: {
        id: 'brand1',
        name: 'Test Brand',
        about: 'Test Brand Description',
        logoLink: 'https://example.com/logo.png',
        createdAt: new Date(),
      },
    },
  },
];

const mockPractice: Practice = {
  id: 'practice1',
  userId: 'user1',
  createdAt: new Date(),
  location: 'Test Location',
  city: 'Test City',
  state: 'NY',
  type: 'drill',
  playDate: '2023-01-01',
  notes: 'Test Notes',
  gearId: 'gear1',
};

describe('PracticeForm', () => {
  const gearPromise = Promise.resolve(mockGear);

  beforeEach(() => {
    (useActionState as Mock).mockImplementation(mockUseActionState);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form for adding a new practice', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);
    render(<PracticeForm page="new" gearPromise={gearPromise} />);

    await waitFor(() => {});

    expect(screen.getByText('Add Practice')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Gear Used')).toBeInTheDocument();
    expect(screen.getByText('Date played')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument();
  });

  it('renders the form for editing an existing practice', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);
    render(
      <PracticeForm
        page="edit"
        targetPracticePromise={Promise.resolve(mockPractice)}
        gearPromise={gearPromise}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Practice')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Location')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test City')).toBeInTheDocument();
      expect(screen.getByText('California')).toBeInTheDocument(); // State

      const drillTrigger = screen.getByRole('combobox', {
        name: 'Select practice type',
      });
      expect(within(drillTrigger).getByText('Drill')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'edit' })).toBeInTheDocument();
    });
  });
});
