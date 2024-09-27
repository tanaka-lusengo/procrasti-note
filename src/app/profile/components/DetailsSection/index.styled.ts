'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

import { SectionContainer } from '../common.styled';

export const DetailsContainer = styled(SectionContainer)`
  flex-basis: 60%;
`;

export const DetailsHeadersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid ${theme.colors.grey};

  @media screen and (min-width: ${theme.spacing.breakpoints.sm}px) {
    flex-direction: row;
    gap: ${theme.spacing.gap.lg}rem;
    justify-content: flex-start;
  }
`;
