import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FormContainer = styled.div`
  position: fixed;
  inset: 0;

  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 75%);

  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 45rem;
  padding: 2rem;

  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 1rem;
  box-shadow: 0 0 5px rgb(0 0 0 / 50%);

  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  button {
    font-size: ${({ theme }) => theme.typography.fontSize.body2}rem;
  }
`;
