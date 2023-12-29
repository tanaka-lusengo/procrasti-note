import styled from 'styled-components';

export const CustomFormikField = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
`;
