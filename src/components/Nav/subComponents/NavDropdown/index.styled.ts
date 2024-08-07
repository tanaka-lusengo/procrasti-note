'use client';

import styled from 'styled-components';

export const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;

  padding-top: 1.5rem;

  text-align: center;

  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  background-color: ${({ theme }) => theme.colors.secondary};

  transition: opacity 0.3s;
  transition: opacity 500ms ease;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
