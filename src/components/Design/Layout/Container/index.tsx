'use client';

import { type SpacingVariants } from '@/components/Design/types';

import * as Styled from './index.styled';

type ComponentVariants = 'div' | 'section';

export type ContainerProps = {
  component?: ComponentVariants;
  maxWidth?: number;
  margin?: SpacingVariants;
  padding?: SpacingVariants;
  children: React.ReactNode | React.ReactNode[];
} & React.HTMLAttributes<HTMLElement>;

const Container = ({
  component = 'div',
  maxWidth,
  margin,
  padding,
  children,
  ...rest
}: ContainerProps) => (
  <Styled.DynamicContainer
    component={component}
    maxWidth={maxWidth}
    margin={margin}
    padding={padding}
    {...rest}
  >
    {children}
  </Styled.DynamicContainer>
);

export default Container;
