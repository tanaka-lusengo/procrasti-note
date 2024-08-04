import styled from 'styled-components';

import { Container } from '../Design';

export const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gap.md}rem;
  align-items: center;
  justify-content: center;

  height: calc(75vh);
`;
