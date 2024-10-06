import { GearSetWithRacketAndString, Match } from '@/shared/types';
import { render, screen, waitFor, within } from '@testing-library/react';
import { useActionState } from 'react';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { MatchForm } from './match-form';

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

const mockGear: GearSetWithRacketAndString[] = [
  {
    id: '1',
    userId: 'user1',
    racketId: 'r1',
    createdAt: new Date(),
    stringId: 's1',
    stringTensionMains: 55,
    stringTensionCrosses: 53,
    racket: {
      id: 'r1',
      model: 'Racket Model 1',
      year: 2021,
      headSize: 100,
      stringPattern: '16x19',
      weight: 300,
      swingWeight: 320,
      brandId: 'b1',
      brand: {
        id: 'b1',
        name: 'Brand 1',
        about: 'About Brand 1',
        logoLink: 'http://example.com/logo1.png',
        createdAt: new Date(),
      },
      createdAt: new Date(),
    },
    strings: {
      id: 's1',
      model: 'String Model 1',
      brandId: 'b1',
      createdAt: new Date(),
      gauge: '16',
      composition: 'Polyester',
      brand: {
        id: 'b1',
        name: 'Brand 1',
        about: 'About Brand 1',
        logoLink: 'http://example.com/logo1.png',
        createdAt: new Date(),
      },
    },
  },
  {
    id: '2',
    userId: 'user2',
    racketId: 'r2',
    createdAt: new Date(),
    stringId: 's2',
    stringTensionMains: 54,
    stringTensionCrosses: 52,
    racket: {
      id: 'r2',
      model: 'Racket Model 2',
      year: 2022,
      headSize: 98,
      brand: {
        id: 'b2',
        name: 'Brand 2',
        about: 'About Brand 2',
        logoLink: 'http://example.com/logo2.png',
        createdAt: new Date(),
      },
      stringPattern: '18x20',
      weight: 305,
      swingWeight: 325,
      brandId: 'b2',
      createdAt: new Date(),
    },
    strings: {
      id: 's2',
      model: 'String Model 2',
      brandId: 'b2',
      brand: {
        id: 'b2',
        name: 'Brand 2',
        about: 'About Brand 2',
        logoLink: 'http://example.com/logo2.png',
        createdAt: new Date(),
      },
      createdAt: new Date(),
      gauge: '16',
      composition: 'Polyester',
    },
  },
];

const mockMatch: Match = {
  id: '1',
  userId: 'user1',
  createdAt: new Date(),
  location: 'Test Location',
  city: 'Test City',
  state: 'CA',
  organization: 'usta',
  gearId: '1',
  playDate: new Date().toISOString(),
  notes: 'Test notes',
  firstSetSelf: null,
  firstSetOpponent: null,
  secondSetSelf: null,
  secondSetOpponent: null,
  thirdSetSelf: null,
  thirdSetOpponent: null,
  firstSetTieBreakSelf: null,
  firstSetTieBreakOpponent: null,
  secondSetTieBreakSelf: null,
  secondSetTieBreakOpponent: null,
  thirdSetTieBreakSelf: null,
  thirdSetTieBreakOpponent: null,
};

describe('MatchForm', () => {
  const gearPromise = Promise.resolve(mockGear);
  beforeEach(() => {
    (useActionState as Mock).mockImplementation(mockUseActionState);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders the form for adding a new match', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);
    render(<MatchForm page="new" gearPromise={gearPromise} />);

    await waitFor(() => {});

    expect(screen.getByText('Add Match')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Played Location')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('New York')).toBeInTheDocument();
    expect(screen.getByText('Select a state')).toBeInTheDocument();
    expect(screen.getByText('Select a organization')).toBeInTheDocument();
    expect(screen.getByText('Select Your Gear')).toBeInTheDocument();
    expect(screen.getByText('Date played')).toBeInTheDocument();
  });

  it('renders the form for editing an existing match', async () => {
    mockUseActionState.mockReturnValue([{ errors: {} }, vi.fn(), false]);
    render(
      <MatchForm
        page="edit"
        targetMatchPromise={Promise.resolve(mockMatch)}
        gearPromise={Promise.resolve(mockGear)}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Match')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Location')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test City')).toBeInTheDocument();

      const stateTrigger = screen.getByRole('combobox', {
        name: 'Select a state',
      });
      expect(within(stateTrigger).getByText('California')).toBeInTheDocument();

      const organizationTrigger = screen.getByRole('combobox', {
        name: 'Select a organization',
      });
      expect(within(organizationTrigger).getByText('USTA')).toBeInTheDocument();

      const gearTrigger = screen.getByRole('combobox', {
        name: 'Select Your Gear',
      });
      expect(
        within(gearTrigger).getByText('Racket Model 1 with String Model 1'),
      ).toBeInTheDocument();

      expect(screen.getByText('Test notes')).toBeInTheDocument();
    });
  });
});
