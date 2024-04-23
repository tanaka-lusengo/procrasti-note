'use client';

import styled from 'styled-components';

export const ButtonText = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  display: inline-block;

  font-size: ${({ theme }) => theme.typography.fontSize.h4}rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

  transition: 0.4s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
