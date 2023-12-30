import styled from 'styled-components';

export const FormikContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

export const FormikErrorText = styled.p`
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.colors.error};
`;
