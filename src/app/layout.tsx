import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';

import { Footer, Nav } from '@/components';
import Providers from '@/Providers';
import Toaster from '@/utils/reactHotToast/Toaster';

import { LayoutContainer } from './layout.styled';
import { metadataContent, PreloadResources } from './preload-resources';

export const metadata: Metadata = {
  ...metadataContent,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Analytics />
      <SpeedInsights />

      <Providers>
        <LayoutContainer component="section">
          <Nav />
          <main>{children}</main>
          <Footer />
        </LayoutContainer>
      </Providers>

      <Toaster />
    </body>

    <PreloadResources />
  </html>
);

export default RootLayout;
