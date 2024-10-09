import { GearSetWithRacketAndString, Practice } from '@/shared/types';
import { render, screen, waitFor, within } from '@testing-library/react';
import { useActionState } from 'react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import {
  generateRandomGearSetWithRacketAndString,
  generateRandomPractice,
} from '../../../../__tests__/mockData';
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
  generateRandomGearSetWithRacketAndString(),
];

const mockPractice: Practice = generateRandomPractice();

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
      expect(
        screen.getByDisplayValue(mockPractice.location),
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockPractice.city)).toBeInTheDocument();
      expect(screen.getByText(mockPractice.state)).toBeInTheDocument(); // State

      const drillTrigger = screen.getByRole('combobox', {
        name: 'Select practice type',
      });
      expect(
        within(drillTrigger).getByText(
          mockPractice.type
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        ),
      ).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'edit' })).toBeInTheDocument();
    });
  });
});
