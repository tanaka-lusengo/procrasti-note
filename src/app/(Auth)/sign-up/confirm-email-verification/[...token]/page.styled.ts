import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const MainContainer = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;

  background-color: rgb(0 0 0 / 75%);

  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 45rem;
  padding: 2rem;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 1rem;
  box-shadow: 0 0 5px rgb(0 0 0 / 50%);

  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 1rem 0 2rem;
  }
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;
