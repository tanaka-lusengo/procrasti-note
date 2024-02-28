'use client';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    max-width: 54rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    max-width: 72rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    max-width: 96rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}px) {
    max-width: 115rem;
  }
`;

export default Container;
