'use client';

import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
`;

export const Logo = styled.h1`
  flex-basis: 50%;

  font-family: ${({ theme }) => theme.typography.fontFamily.ultra};
  font-size: ${({ theme }) => theme.typography.fontSize.h6}rem;
  text-align: center;

  transition: 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: ${({ theme }) => theme.typography.fontSize.h4}rem;
  }
`;

export const NavItemContainer = styled.div`
  a {
    flex-basis: 25%;
    margin: 0 1rem;
    font-weight: bold;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    a {
      font-size: ${({ theme }) => theme.typography.fontSize.body1}rem;
    }
  }
`;
