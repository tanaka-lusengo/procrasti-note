'use client';

import { useFormStatus } from 'react-dom';

import { FontSizeVariants } from '../../types';

import * as Styled from './index.styled';

type ButtonProps = {
  $secondary?: boolean;
  $basefont?: boolean;
  fontSize?: FontSizeVariants;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  $basefont,
  $secondary,
  fontSize,
  children,
  ...rest
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Styled.Button
      $basefont={$basefont}
      $secondary={$secondary}
      fontSize={fontSize}
      {...rest}
    >
      {pending ? 'Loading...' : children}
    </Styled.Button>
  );
};

export default Button;
