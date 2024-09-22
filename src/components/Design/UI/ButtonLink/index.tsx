'use client';

import { FontSizeVariants } from '../../types';

import * as Styled from './index.styled';

interface ButtonLinkProps {
  $basefont?: boolean;
  fontSize?: FontSizeVariants;
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonLink = ({
  $basefont,
  fontSize,
  href,
  onClick,
  children,
}: ButtonLinkProps) => {
  return (
    <Styled.ButtonLink
      $basefont={$basefont}
      fontSize={fontSize}
      href={href}
      onClick={onClick}
    >
      {children}
    </Styled.ButtonLink>
  );
};

export default ButtonLink;
