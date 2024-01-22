import styled from 'styled-components';

export const CommonButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  button {
    font-size: ${({ theme }) => theme.typography.fontSize.body2}rem;
  }
`;
