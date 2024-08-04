'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

const { spacing, typography } = theme;

export const FooterContainer = styled.footer`
  width: 100%;
  padding-top: ${spacing.gap.xl}rem;

  p {
    font-size: ${typography.fontSize.body2}rem;
    text-align: center;
  }

  @media screen and (min-width: ${spacing.breakpoints.md}px) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;
