import styled from 'styled-components';

export const Containter = styled.section`
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

export const ContentContainter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  width: 100%;
  max-width: 65rem;
  min-height: 50vh;
  margin: 1rem auto;
  padding: 2rem;

  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 1rem;

  h6 {
    font-weight: bold;
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
    transition: 0.3s ease-in-out;

    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;
