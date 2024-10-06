import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SetScoreCard } from './set-score-card';

describe('SetScoreCard', () => {
  it('renders correctly with initial state', () => {
    render(<SetScoreCard set={1} />);
    expect(screen.getByText('Set 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Score')).toBeInTheDocument();
    expect(screen.getByLabelText('Opponent Score')).toBeInTheDocument();
  });

  it('updates self score and sets winner to self', () => {
    render(<SetScoreCard set={1} />);
    const selfScoreInput = screen.getByLabelText('Your Score');
    const opponentScoreInput = screen.getByLabelText('Opponent Score');

    fireEvent.change(selfScoreInput, { target: { value: '5' } });
    fireEvent.change(opponentScoreInput, { target: { value: '3' } });

    expect(selfScoreInput).toHaveValue(5);
    expect(opponentScoreInput).toHaveValue(3);
    expect(screen.queryByText('Your Tie Break')).not.toBeInTheDocument();
  });

  it('updates opponent score and sets winner to opponent', () => {
    render(<SetScoreCard set={1} />);
    const selfScoreInput = screen.getByLabelText('Your Score');
    const opponentScoreInput = screen.getByLabelText('Opponent Score');

    fireEvent.change(selfScoreInput, { target: { value: '2' } });
    fireEvent.change(opponentScoreInput, { target: { value: '4' } });

    expect(selfScoreInput).toHaveValue(2);
    expect(opponentScoreInput).toHaveValue(4);
    expect(screen.queryByText('Your Tie Break')).not.toBeInTheDocument();
  });

  it('sets winner to tiebreak when both scores are 6', () => {
    render(<SetScoreCard set={1} />);
    const selfScoreInput = screen.getByLabelText('Your Score');
    const opponentScoreInput = screen.getByLabelText('Opponent Score');

    fireEvent.change(selfScoreInput, { target: { value: '6' } });
    fireEvent.change(opponentScoreInput, { target: { value: '6' } });

    expect(selfScoreInput).toHaveValue(6);
    expect(opponentScoreInput).toHaveValue(6);
    expect(screen.getByLabelText('Your Tie Break')).toBeInTheDocument();
    expect(screen.getByLabelText('Opponent Tie Break')).toBeInTheDocument();
  });

  it('renders with previous state', () => {
    const prevState = {
      id: '1',
      createdAt: null,
      state: 'ongoing',
      organization: 'My Organization',
      location: 'Court 1',
      city: 'New York',
      playDate: '2023-10-01',
      notes: null,
      firstSetSelf: 3,
      firstSetOpponent: 4,
      firstSetTieBreakSelf: 7,
      firstSetTieBreakOpponent: 5,
      secondSetSelf: null,
      secondSetOpponent: null,
      secondSetTieBreakSelf: null,
      secondSetTieBreakOpponent: null,
      thirdSetSelf: null,
      thirdSetOpponent: null,
      thirdSetTieBreakSelf: null,
      thirdSetTieBreakOpponent: null,
      gearId: 'gear-456',
      userId: 'user-123',
    };

    render(<SetScoreCard set={1} prevState={prevState} />);

    expect(screen.getByLabelText('Your Score')).toHaveValue(3);
    expect(screen.getByLabelText('Opponent Score')).toHaveValue(4);
    expect(screen.queryByText('Your Tie Break')).not.toBeInTheDocument();
  });
});
