import type { FC } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadataContent: Metadata = {
  title: {
    template: '%s | Procrasti-Not(e)',
    default: 'Procrasti-Not(e)',
  },
  description:
    'A simple (over engineered or scalable? 😏) draggable notes taking app',
  generator: 'Next.js',
  applicationName: 'Procrasti-Not(e)',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Notes',
    'Productivity',
    'Procrastination',
    'Next.js',
    'React',
    'TypeScript',
    'Styled Components',
    'Vitest',
    'React Testing Library',
    'FastAPI',
    'Python',
  ],
  authors: [
    {
      name: 'Tanaka Lusengo',
      url: 'https://www.linkedin.com/in/tanakalusengo/',
    },
  ],
  creator: 'Tanaka Lusengo',
};

// Below are metadata types the do not currently have built-in support (as of Next "14.0.4"). However, they can still be rendered in the layout or page itself ✌🏾
export const PreloadResources: FC = () => (
  <Script src="https://kit.fontawesome.com/89f72e9d16.js"></Script>
);
