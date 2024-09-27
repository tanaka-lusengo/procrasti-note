import styled, { css } from 'styled-components';

export const Divider = styled.div<{ hidden?: boolean; $noMargin?: boolean }>`
  ${({ hidden, $noMargin }) =>
    hidden
      ? css`
          display: block;
          visibility: hidden;
        `
      : css`
          margin: ${$noMargin ? '0' : '2rem 0'};
          border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
        `}
`;
