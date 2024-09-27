'use client';

import * as Styled from './index.styled';

export type DividerProps = {
  hidden?: boolean;
  $noMargin?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Divider = ({ hidden, $noMargin, ...rest }: DividerProps) => (
  <Styled.Divider hidden={hidden} $noMargin={$noMargin} {...rest} />
);

export default Divider;
