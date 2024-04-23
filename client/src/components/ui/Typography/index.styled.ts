'use client';

import { createElement } from 'react';
import styled from 'styled-components';

import { theme } from '@/styles';

import { TypographyProps } from './index';

const fontSizeMap = {
  body1: theme.typography.fontSize.body1,
  body2: theme.typography.fontSize.body2,
  h1: theme.typography.fontSize.h1,
  h2: theme.typography.fontSize.h2,
  h3: theme.typography.fontSize.h3,
  h4: theme.typography.fontSize.h4,
  h5: theme.typography.fontSize.h5,
  h6: theme.typography.fontSize.h6,
  p: theme.typography.fontSize.body1,
  span: theme.typography.fontSize.body1,
  li: theme.typography.fontSize.body1,
};

// A styled component for creating dynamic typography elements based on the props passed to it.
export const DynamicTypography = styled(
  ({ tag = 'p', children, ...props }: TypographyProps) =>
    createElement(tag, props, children),
)`
  font-size: ${({ tag, fontSize }) =>
    fontSize
      ? `${fontSizeMap[fontSize as keyof typeof fontSizeMap]}rem`
      : `${fontSizeMap[tag as keyof typeof fontSizeMap]}rem`};
  text-align: ${({ textalign }) => textalign};
  color: ${({ color }) => theme.colors[color as keyof typeof theme.colors]};
`;
