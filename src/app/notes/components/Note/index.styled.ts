import Link from 'next/link';
import styled from 'styled-components';

export const CardContainer = styled.li`
  display: flex;
  justify-content: center;

  list-style: none;
  margin-bottom: 1.5rem;
`;

export const CardContent = styled(Link)`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;

  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 65rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  h6 {
    font-weight: normal;
    font-style: italic;
  }
`;
