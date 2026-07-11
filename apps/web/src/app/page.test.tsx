import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('communicates the store proposition', async () => {
    render(await HomePage());
    expect(
      screen.getByRole('heading', { name: /Lo cotidiano/ }),
    ).toBeInTheDocument();
  });
});
