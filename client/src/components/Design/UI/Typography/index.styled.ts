'use client';

import { createElement } from 'react';
import styled from 'styled-components';

import { FONTSIZE_MAP, SPACING_MAP } from '@/components/Design/constants';
import { theme } from '@/styles';

import { type TypographyProps } from './index';

export const DynamicTypography = styled(
  ({
    component = 'p',
    // -- parameters below are not used in this context to avoid passing it to the DOM
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    marginTop,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    marginBottom,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textAlign,
    children,
    ...props
  }: TypographyProps) => createElement(component, props, children),
)`
  font-size: ${({ component = 'p', fontSize }) =>
    fontSize
      ? `${FONTSIZE_MAP[fontSize]}rem`
      : `${FONTSIZE_MAP[component]}rem`};

  color: ${({ color }) => (color ? theme.colors[color] : theme.colors.text)};

  text-align: ${({ textAlign }) => textAlign};

  margin-top: ${({ marginTop }) =>
    marginTop ? `${SPACING_MAP[marginTop]}rem` : `0`};

  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? `${SPACING_MAP[marginBottom]}rem` : `0`};
`;
