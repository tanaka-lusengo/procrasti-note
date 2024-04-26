'use client';

import * as Styled from './index.styled';

export type DividerProps = {
  hidden?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Divider = ({ hidden, ...rest }: DividerProps) => (
  <Styled.Divider hidden={hidden} {...rest} />
);

export default Divider;
