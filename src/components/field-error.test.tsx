import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FieldError } from './field-error';

describe('FieldError component', () => {
  it('renders the error message', () => {
    const errorMessage = 'This is an error message';
    render(<FieldError msg={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-sm text-red-500');
  });
});
