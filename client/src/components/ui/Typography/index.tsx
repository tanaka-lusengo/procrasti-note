import { CSSProperties } from 'react';

import * as Styled from './index.styled';
import {
  type ColorVariants,
  type FontSizeVariants,
  type TagVariants,
} from './types';

export type TypographyProps = {
  textalign?: CSSProperties['textAlign'];
  tag?: TagVariants;
  fontSize?: FontSizeVariants;
  color?: ColorVariants;
  children: React.ReactNode;
};

const Typography = ({
  textalign = 'left',
  tag = 'p',
  fontSize,
  color,
  children,
}: TypographyProps) => (
  <Styled.DynamicTypography
    tag={tag}
    textalign={textalign}
    fontSize={fontSize}
    color={color}
  >
    {children}
  </Styled.DynamicTypography>
);

export default Typography;
