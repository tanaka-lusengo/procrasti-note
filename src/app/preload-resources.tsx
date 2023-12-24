import type { FC } from 'react';
import type { Metadata } from 'next';

export const metadataContent: Metadata = {
  title: {
    template: '%s | Procrasti-Not(e)',
    default: 'Procrasti-Not(e)',
  },
  description: 'A simple draggable notes taking app',
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
    'JavaScript',
    'Styled Components',
    'Vitest',
    'React Testing Library',
    'PocketBase',
  ],
  authors: [
    { name: 'Tanaka Lusengo' },
    {
      name: 'Tanaka Lusengo',
      url: 'https://www.linkedin.com/in/tanakalusengo/', // << TODO: update url to personal site when in production and deployed
    },
  ],
  creator: 'Tanaka Lusengo',
};

// Below are metadata types the do not currently have built-in support (as of Next "14.0.4"). However, they can still be rendered in the layout or page itself ✌🏾
export const PreloadResources: FC = () => (
  <script
    src="https://kit.fontawesome.com/89f72e9d16.js"
    crossOrigin="anonymous"
    rel="preload"
    async
  ></script>
);
