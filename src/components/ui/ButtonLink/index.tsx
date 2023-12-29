import Link from 'next/link';
import styled from 'styled-components';

const ButtonLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.ultra};
  font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: 0.4s ease-in-out;
  display: inline-block;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default ButtonLink;
