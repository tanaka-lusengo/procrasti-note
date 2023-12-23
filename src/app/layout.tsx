import type { Metadata } from 'next';

import Nav from '@/components/Nav';
import Container from '@/components/ui/Container';
import Providers from '@/Providers';

export const metadata: Metadata = {
  title: 'Procrasti-Not(e)',
  description: 'A simple draggable notes taking app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Providers>
        <Container about="App content">
          <Nav />
          <main>{children}</main>
        </Container>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
