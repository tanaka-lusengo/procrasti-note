import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';

import { Container } from '@/components/Design';
import Nav from '@/components/Nav';
import Providers from '@/Providers';
import Toaster from '@/utils/reactHotToast/Toaster';

import { metadataContent, PreloadResources } from './preload-resources';

const MAIN_CONTENT_ID = 'main-app-content';

export const metadata: Metadata = {
  ...metadataContent,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Analytics />
      <SpeedInsights />

      <Providers>
        <Container id={MAIN_CONTENT_ID} component="section" padding="md">
          <Nav />
          <main>{children}</main>
        </Container>
      </Providers>

      <Toaster />
    </body>

    <PreloadResources />
  </html>
);

export default RootLayout;
