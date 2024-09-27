'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.gap.md}rem;
  padding: ${theme.spacing.gap.md}rem;
`;
