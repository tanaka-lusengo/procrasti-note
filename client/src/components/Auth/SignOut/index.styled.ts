'use client';

import styled from 'styled-components';

export const ButtonText = styled.button`
  cursor: pointer;

  display: inline-block;

  padding: 0;

  font: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.h4}rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

  background: none;
  border: none;

  transition: 0.4s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
