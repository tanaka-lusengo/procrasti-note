'use client';

import styled from 'styled-components';

export const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 5rem;

  overflow: hidden;

  padding-top: 1.5rem;

  text-align: center;

  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  background-color: ${({ theme }) => theme.colors.secondary};

  transition: opacity 0.5s;
  transition: opacity 500ms ease;
  transition-delay: 0.5s;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
