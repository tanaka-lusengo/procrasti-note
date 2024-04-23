'use client';

import { useFormStatus } from 'react-dom';

import * as Styled from './index.styled';

interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
}

const ButtonLink = ({ children, href }: ButtonLinkProps) => {
  const { pending } = useFormStatus();

  return (
    <Styled.ButtonLink href={href}>
      {pending ? 'Loading...' : children}
    </Styled.ButtonLink>
  );
};

export default ButtonLink;
