import styled from 'styled-components';

export const CompleteButton = styled.button<{ $isComplete: boolean }>`
  cursor: pointer;
  background-color: transparent;
  border: none;

  img {
    opacity: ${({ $isComplete }) => ($isComplete ? 1 : 0.5)};
    transition: opacity 0.5s ease-in-out;
  }
`;
