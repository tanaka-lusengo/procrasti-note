import styled from 'styled-components';

export const IconContainer = styled.div`
  svg {
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;
