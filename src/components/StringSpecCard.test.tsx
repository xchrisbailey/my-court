import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StringSpecCard from './StringSpecCard';

describe('StringSpecCard', () => {
  const props = {
    gauge: '16',
    composition: 'polyester',
  };

  it('renders the card title', () => {
    render(<StringSpecCard {...props} />);
    expect(screen.getByText('Specs')).toBeInTheDocument();
  });

  it('displays the gauge', () => {
    render(<StringSpecCard {...props} />);
    expect(screen.getByText('Gauge:')).toBeInTheDocument();
    expect(screen.getByText('16/1.30mm')).toBeInTheDocument();
  });

  it('displays the string composition', () => {
    render(<StringSpecCard {...props} />);
    expect(screen.getByText('Composition:')).toBeInTheDocument();
    expect(screen.getByText('polyester')).toBeInTheDocument();
  });
});
