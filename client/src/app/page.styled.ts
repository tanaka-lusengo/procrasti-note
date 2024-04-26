'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

const { spacing, typography } = theme;

export const Subtitle = styled.p`
  margin-bottom: ${spacing.gap.md}rem;

  text-align: center;
  font-size: ${typography.fontSize.h5}rem;

  @media only screen and (min-width: ${spacing.breakpoints.md}px) {
    max-width: 75%;
    font-size: ${typography.fontSize.h4}rem;
  }
`;
