'use client';

import { ThemeProvider } from 'styled-components';

import { UserContextProvider } from '@/context/UserContext';
import { StyledComponentsRegistry } from '@/lib';
import { GlobalStyles, theme } from '@/styles';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <UserContextProvider>
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  </UserContextProvider>
);

export default Providers;
