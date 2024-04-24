import { type Metadata } from 'next';

import Nav from '@/components/Nav';
import Container from '@/components/UI/Container/index.styled';
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
      <Providers>
        <Container id={MAIN_CONTENT_ID}>
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
