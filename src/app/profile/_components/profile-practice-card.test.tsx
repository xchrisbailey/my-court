import { Practice } from '@/shared/types';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProfilePracticeCard } from './profile-practice-card';

describe('ProfilePracticeCard', () => {
  const practice: Practice = {
    id: '1',
    type: 'Tennis',
    playDate: '2023-10-01T10:00:00Z',
    location: 'Central Park',
    city: 'New York',
    state: 'NY',
    notes: 'Bring your own racket',
    gearId: null,
    userId: null,
    createdAt: null,
  };

  it('renders practice type, date, and location', async () => {
    render(<ProfilePracticeCard practice={practice} />);

    await waitFor(() => {});

    expect(screen.getByText('Tennis')).toBeInTheDocument();
    expect(screen.getByText('10/1/2023')).toBeInTheDocument();
    expect(screen.getByText('Central Park, New York, NY')).toBeInTheDocument();
  });

  // it('renders the play time in the badge', () => {
  //   render(<ProfilePracticeCard practice={practice} />);

  //   expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  // });

  // it('does not render notes if not provided', () => {
  //   const practiceWithoutNotes = { ...practice, notes: '' };
  //   render(<ProfilePracticeCard practice={practiceWithoutNotes} />);

  //   expect(screen.queryByText('Bring your own racket')).not.toBeInTheDocument();
  // });
});
