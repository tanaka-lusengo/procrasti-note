'use client';

import styled from 'styled-components';

export const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 5rem;

  overflow: hidden;

  padding-top: 1.5rem;

  text-align: center;

  transition: opacity 0.5s;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition-delay: 0.5s;

  background-color: ${({ theme }) => theme.colors.secondary};

  transition: opacity 500ms ease;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
