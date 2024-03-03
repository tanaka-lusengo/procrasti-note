import styled from 'styled-components';

export const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 5rem;

  overflow: hidden;

  padding: 1rem 0;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  background-color: ${({ theme }) => theme.colors.secondary};

  transition: opacity 500ms ease;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
