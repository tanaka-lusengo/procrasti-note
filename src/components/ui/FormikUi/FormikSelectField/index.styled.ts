import styled from 'styled-components';

export const CustomFormikSelectField = styled.select`
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 1rem;
`;
