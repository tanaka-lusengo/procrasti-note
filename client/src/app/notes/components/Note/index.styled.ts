'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const CardContainer = styled.li`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  margin-bottom: 1.5rem;

  list-style: none;
`;

export const CardContent = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  max-width: 65rem;
  padding: 0.5rem 1rem;

  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 1rem;
  box-shadow: 0 0 5px rgb(0 0 0 / 50%);

  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  h6 {
    font-weight: normal;
    font-style: italic;
  }
`;
