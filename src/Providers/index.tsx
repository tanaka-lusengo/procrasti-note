'use client';

import { ThemeProvider } from 'styled-components';

import { PocketbaseProvider } from '@/context/PocketbaseContext';
import { StyledComponentsRegistry } from '@/lib';
import { GlobalStyles, theme } from '@/styles';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PocketbaseProvider>
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  </PocketbaseProvider>
);

export default Providers;
