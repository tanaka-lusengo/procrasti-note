import Link from 'next/link';
import styled from 'styled-components';

import { FONTSIZE_MAP } from '../../constants';
import { FontSizeVariants } from '../../types';

interface ButtonLinkProps {
  $basefont?: boolean;
  fontSize?: FontSizeVariants;
}

export const ButtonLink = styled(Link)<ButtonLinkProps>`
  display: inline-block;

  padding: 0.5rem 1rem;

  font-family: ${({ theme, $basefont }) =>
    $basefont
      ? theme.typography.fontFamily.slabo
      : theme.typography.fontFamily.ultra};
  font-size: ${({ theme, fontSize }) =>
    fontSize
      ? `${FONTSIZE_MAP[fontSize]}rem`
      : `${theme.typography.fontSize.h5}rem`};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};

  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;

  transition: 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
