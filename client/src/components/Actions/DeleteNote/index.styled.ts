import styled from 'styled-components';

export const IconButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;

  svg {
    color: ${({ theme }) => theme.colors.error};
    transition: 0.3s ease-in-out;

    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;
