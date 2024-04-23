'use client';

import { useFormStatus } from 'react-dom';

import * as Styled from './index.styled';

type ButtonProps = {
  $secondary?: boolean;
  $basefont?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  $basefont,
  $secondary,
  type,
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Styled.Button
      $basefont={$basefont}
      $secondary={$secondary}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {pending ? 'Loading...' : children}
    </Styled.Button>
  );
};

export default Button;
