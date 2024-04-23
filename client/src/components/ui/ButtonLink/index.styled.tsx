import Link from 'next/link';
import styled from 'styled-components';

export const ButtonLink = styled(Link)`
  display: inline-block;

  padding: 0.5rem 1rem;

  font-family: ${({ theme }) => theme.typography.fontFamily.ultra};
  font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
  color: ${({ theme }) => theme.colors.secondary};

  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;

  transition: 0.4s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
