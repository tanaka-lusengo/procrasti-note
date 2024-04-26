import styled from 'styled-components';

import { theme } from '@/styles';

const { colors, typography, spacing } = theme;

export const IconButton = styled.button<{ $left?: boolean }>`
  cursor: pointer;
  background-color: transparent;
  border: none;

  svg {
    margin: 0 1rem;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${colors.primary};
    }

    &:active {
      ${({ $left }) =>
        $left
          ? 'transform: translateX(0.3rem);'
          : 'transform: translateX(-0.3rem);'}
    }
  }
`;

export const ContentContainter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  width: 100%;
  max-width: 65rem;
  min-height: 40vh;
  margin: 2rem 0;
  padding: 2rem;

  background-color: ${colors.tertiary};
  border-radius: 1rem;

  @media only screen and (min-width: ${spacing.breakpoints.md}px) {
    p {
      font-size: ${typography.fontSize.h4}rem;
    }
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 65rem;
  margin: 0 auto;
  padding: 0 2rem;

  svg {
    color: ${colors.error};
    transition: 0.3s ease-in-out;

    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;
