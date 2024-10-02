import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RacketSpecCard from './racket-spec-card';

describe('RacketSpecCard', () => {
  const props = {
    headSize: '100',
    stringPattern: '16x19',
    weight: 300,
    swingWeight: 320,
  };

  it('renders the card title', () => {
    render(<RacketSpecCard {...props} />);
    expect(screen.getByText('Specs')).toBeInTheDocument();
  });

  it('displays the swing weight', () => {
    render(<RacketSpecCard {...props} />);
    expect(screen.getByText('Swing Weight:')).toBeInTheDocument();
    expect(screen.getByText('320 kg/cm²')).toBeInTheDocument();
  });

  it('displays the weight in grams and ounces', () => {
    render(<RacketSpecCard {...props} />);
    expect(screen.getByText('Weight:')).toBeInTheDocument();
    expect(screen.getByText('300g (10.58 oz)')).toBeInTheDocument();
  });

  it('displays the head size in square inches and square centimeters', () => {
    render(<RacketSpecCard {...props} />);
    expect(screen.getByText('Head Size:')).toBeInTheDocument();
    expect(screen.getByText('100 in² (645.16 cm²)')).toBeInTheDocument();
  });

  it('displays the string pattern', () => {
    render(<RacketSpecCard {...props} />);
    expect(screen.getByText('String Pattern:')).toBeInTheDocument();
    expect(screen.getByText('16x19')).toBeInTheDocument();
  });
});
