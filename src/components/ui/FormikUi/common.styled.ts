import styled from 'styled-components';

export const FormikContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  margin: 0 auto;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 50rem;
`;

export const FormikErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.2rem;
`;
