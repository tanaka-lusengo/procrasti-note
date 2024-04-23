import styled from 'styled-components';

export const UpperButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Divider = styled.div`
  margin: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const Typography = styled.p`
  font-weight: bold;
  font-style: italic;
  color: ${({ theme }) => theme.colors.primary};
  text-align: end;
`;
