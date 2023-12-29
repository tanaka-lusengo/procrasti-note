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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.75);
  overflow-y: auto;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${fadeIn} 0.4s ease-in-out;
`;

export const FormContent = styled.div`
  background-color: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 45rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  animation: ${fadeIn} 0.4s ease-in-out;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  button {
    font-size: ${({ theme }) => theme.typography.fontSize.body2}rem;
  }
`;
