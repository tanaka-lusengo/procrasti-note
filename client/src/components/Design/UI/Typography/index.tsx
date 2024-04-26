'use client';

import { CSSProperties } from 'react';

import { SpacingVariants } from '@/components/Design/types';

import {
  type ColorVariants,
  type ComponentVariants,
  type FontSizeVariants,
} from '../../types';

import * as Styled from './index.styled';

export type TypographyProps = {
  component?: ComponentVariants;
  textAlign?: CSSProperties['textAlign'];
  marginTop?: SpacingVariants;
  marginBottom?: SpacingVariants;
  fontSize?: FontSizeVariants;
  color?: ColorVariants;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Typography = ({
  component = 'p',
  textAlign = 'left',
  marginTop,
  marginBottom,
  fontSize,
  color,
  children,
  ...rest
}: TypographyProps) => (
  <Styled.DynamicTypography
    component={component}
    textAlign={textAlign}
    marginTop={marginTop}
    marginBottom={marginBottom}
    fontSize={fontSize}
    color={color}
    {...rest}
  >
    {children}
  </Styled.DynamicTypography>
);

export default Typography;
