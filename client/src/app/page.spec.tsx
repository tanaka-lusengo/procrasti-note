import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { customRender } from '@/utils/test-utils';

import HomePage from './page';

describe('./HomePage.tsx', async () => {
  it('renders the general page content', async () => {
    // render page
    customRender(<HomePage />);

    // Check the Typewriter wrapper exists
    const title = screen.getByTestId('typewriter-wrapper');
    expect(title).toBeInTheDocument();

    // Check for image
    const image = screen.getByRole('img');
    expect(image).toHaveProperty(
      'alt',
      'Man hugging a giant cup of spilling coffee',
    );
    expect(image).toBeVisible();

    // check for content
    const paragraphPartial = screen.getByText(
      /is a simple and effective "to-do" list and task manager app which helps you manage your time and, of course,/,
    );
    expect(paragraphPartial).toBeInTheDocument();

    // Check for link
    const link = screen.getByRole('link', { name: 'Lets get started!' });
    expect(link).toHaveAttribute('href', '/notes');
    expect(link).toBeInTheDocument();
  });
});
