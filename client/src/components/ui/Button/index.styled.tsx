import styled from 'styled-components';

interface ButtonProps {
  $secondary?: boolean;
  $basefont?: boolean;
}

export const Button = styled.button<ButtonProps>`
  cursor: pointer;

  display: inline-block;

  padding: 0.5rem 1rem;

  font-family: ${({ theme, $basefont }) =>
    $basefont
      ? theme.typography.fontFamily.slabo
      : theme.typography.fontFamily.ultra};
  font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};

  background-color: ${({ theme, $secondary }) =>
    $secondary ? theme.colors.tertiaryDark : theme.colors.primary};
  border: none;
  border-radius: 1rem;

  transition: 0.4s ease-in-out;

  &:disabled {
    filter: grayscale(0.8);
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
