import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { StyledComponentsRegistry } from '@/lib';
import { GlobalStyles, theme } from '@/styles';

const customRender = (component: ReactNode) =>
  render(
    <StyledComponentsRegistry>
      <GlobalStyles />
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </StyledComponentsRegistry>,
  );

export default customRender;
