import styled, { css } from 'styled-components';

export const Divider = styled.div`
  ${({ hidden }) =>
    hidden
      ? css`
          visibility: hidden;
          display: block;
        `
      : css`
          margin: 2rem 0;
          border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
        `}
`;
