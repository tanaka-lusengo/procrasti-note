import styled from 'styled-components';

export const NoteContainter = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 75rem;
  margin: 2rem auto;

  h6 {
    font-weight: 400;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 65rem;
  margin: 0 auto;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    h3 {
      font-size: ${({ theme }) => theme.typography.fontSize.h2}rem;
    }
  }
`;

export const MiddleContainter = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 75rem;
`;

export const IconButton = styled.button<{ $left?: boolean }>`
  cursor: pointer;
  background-color: transparent;
  border: none;

  svg {
    margin: 0 1rem;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
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

  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 1rem;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    h6 {
      font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
    }

    h5 {
      font-size: ${({ theme }) => theme.typography.fontSize.h4}rem;
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
    color: ${({ theme }) => theme.colors.error};
    transition: 0.3s ease-in-out;

    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;

export const HiddenDiv = styled.div`
  visibility: hidden;
`;
