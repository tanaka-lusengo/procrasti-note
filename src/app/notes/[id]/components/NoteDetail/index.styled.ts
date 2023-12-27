import styled from 'styled-components';

export const Containter = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
  width: 100%;
  max-width: 75rem;

  h6 {
    font-weight: 400;
  }
`;

export const ContentContainter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  margin: 2rem auto;
  padding: 2rem;
  width: 100%;
  max-width: 65rem;
  min-height: 50vh;

  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;

  h6 {
    font-weight: bold;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
