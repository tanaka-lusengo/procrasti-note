'use client';

import styled from 'styled-components';

import { Container } from '@/components/Design';
import { theme } from '@/styles';

export const LayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: ${theme.spacing.gap.md}rem;

  main {
    flex: 1;
  }
`;
