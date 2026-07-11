import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('identifies the store', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Grupo 1 Store' }),
    ).toBeInTheDocument();
  });
});
