import styled from 'styled-components';

import { theme } from '@/styles';

const { spacing } = theme;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 65rem;

  @media only screen and (min-width: ${spacing.breakpoints.md}px) {
    flex-direction: row;
  }
`;

export const Wave = styled.span`
  @keyframes wave-animation {
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

  transform-origin: 70% 70%;
  display: inline-block;
  animation: wave-animation 2.5s infinite;
`;
