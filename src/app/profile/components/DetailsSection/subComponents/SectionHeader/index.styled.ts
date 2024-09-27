'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

export const DetailsTitleItem = styled.div<{ $isVisible: boolean }>`
  cursor: pointer;

  display: flex;
  gap: ${theme.spacing.gap.xs}rem;

  border-bottom: 2px solid
    ${({ $isVisible }) => ($isVisible ? theme.colors.primary : 'transparent')};

  transition: all 0.3s ease-in-out;

  p {
    color: ${({ $isVisible }) =>
      $isVisible ? theme.colors.text : theme.colors.grey};
  }

  span {
    font-weight: bold;
  }

  &:hover {
    border-bottom: 2px solid ${theme.colors.primary};
  }
`;
