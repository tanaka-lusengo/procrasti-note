'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

const { colors, typography } = theme;

export const ButtonText = styled.button`
  cursor: pointer;

  display: inline-block;

  width: 8rem;
  padding: 0;

  font: inherit;
  font-size: ${typography.fontSize.h4}rem;
  font-weight: bold;
  color: ${colors.text};

  background: none;
  border: none;

  transition: 0.4s ease-in-out;

  &:hover {
    color: ${colors.primary};
  }
`;
