'use client';

import { ThemeProvider } from 'styled-components';

import { StyledComponentsRegistry } from '@/lib';
import { GlobalStyles, theme } from '@/styles';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <StyledComponentsRegistry>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </StyledComponentsRegistry>
);

export default Providers;
