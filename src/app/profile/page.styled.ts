'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${theme.spacing.breakpoints.lg}px) {
    flex-direction: row;
  }
`;
