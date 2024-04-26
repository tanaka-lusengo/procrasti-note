'use client';

import { CSSProperties } from 'react';

import { SpacingVariants } from '@/components/Design/types';

import * as Styled from './index.styled';

type ComponentVariants = 'div' | 'section';

export type StackProps = {
  component?: ComponentVariants;
  direction?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: SpacingVariants;
  maxWidth?: number;
  margin?: SpacingVariants;
  marginTop?: SpacingVariants;
  marginBottom?: SpacingVariants;
  children: React.ReactNode | React.ReactNode[];
} & React.HTMLAttributes<HTMLElement>;

const Stack = ({
  component = 'div',
  direction = 'row',
  justifyContent = 'normal',
  alignItems = 'normal',
  gap = 'sm',
  maxWidth,
  margin,
  marginTop,
  marginBottom,
  children,
  ...rest
}: StackProps) => (
  <Styled.DynamicStack
    component={component}
    direction={direction}
    justifyContent={justifyContent}
    alignItems={alignItems}
    gap={gap}
    maxWidth={maxWidth}
    margin={margin}
    marginTop={marginTop}
    marginBottom={marginBottom}
    {...rest}
  >
    {children}
  </Styled.DynamicStack>
);

export default Stack;
