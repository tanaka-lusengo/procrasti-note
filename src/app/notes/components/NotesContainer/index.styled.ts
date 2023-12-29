import styled from 'styled-components';

export const Container = styled.div`
  margin: 4rem auto;
  max-width: 80rem;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  align-items: center;

  width: 100%;
  max-width: 65rem;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: row;
  }
`;

export const Wave = styled.span`
  @keyframes waveAnimation {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(14deg);
    }
    20% {
      transform: rotate(-8deg);
    }
    30% {
      transform: rotate(14deg);
    }
    40% {
      transform: rotate(-4deg);
    }
    50% {
      transform: rotate(10deg);
    }
    60% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  animation: waveAnimation 2.5s infinite;
  transform-origin: 70% 70%;
  display: inline-block;
`;

export const Number = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const List = styled.ul`
  width: 100%;
  max-width: 55rem;
  max-height: 50vh;
  overflow-y: scroll;
  padding: 1rem;

  border: 1px transparent solid;
  border-radius: 1rem;
`;
