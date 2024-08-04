import styled from 'styled-components';

import { Container } from '../Design';

export const ErrorBoundaryContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.gap.md}rem;

  height: calc(75vh);
`;
