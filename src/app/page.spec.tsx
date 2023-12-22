import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { customRender } from '@/tests';

import HomePage from './page';

describe('./HomePage.tsx', async () => {
  it('renders general page content', async () => {
    // render page
    customRender(<HomePage />);

    // Check the Typewriter wrapper exists
    const title = screen.getByTestId('typewriter-wrapper');
    expect(title).toBeTruthy();

    // Check for image
    const image = screen.getByRole('img');
    expect(title).toBeVisible();
    expect(image).toHaveProperty(
      'alt',
      'Man hugging a giant cup of spilling coffee',
    );

    // Check for link
    const link = screen.getByRole('link', { name: 'Lets Get Started!' });
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute('href', '/notes');
  });
});
