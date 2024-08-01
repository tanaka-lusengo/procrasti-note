'use client';

import styled from 'styled-components';

import { theme } from '@/styles';

const { breakpoints } = theme.spacing;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
`;

export const Logo = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.ultra};
  font-size: ${({ theme }) => theme.typography.fontSize.h6}rem;
  text-align: center;
  transition: 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media only screen and (min-width: ${breakpoints.md}px) {
    font-size: ${({ theme }) => theme.typography.fontSize.h3}rem;
  }
`;

export const DropdownContainer = styled.div`
  a {
    display: block;

    width: 8rem;

    font-weight: bold;
    text-align: center;

    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media only screen and (min-width: ${breakpoints.md}px) {
    a {
      font-size: ${({ theme }) => theme.typography.fontSize.h4}rem;
    }
  }
`;
