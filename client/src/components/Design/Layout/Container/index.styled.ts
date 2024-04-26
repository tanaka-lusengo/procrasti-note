'use client';

import { createElement } from 'react';
import styled, { css } from 'styled-components';

import { theme } from '@/styles';

import { SPACING_MAP } from '../../constants';

import { type ContainerProps } from './index';

const { spacing } = theme;

export const DynamicContainer = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- maxWidth is not used in this context to avoid passing it to the DOM
  ({ component = 'div', maxWidth, children, ...props }: ContainerProps) =>
    createElement(component, props, children),
)`
  margin: 0 auto;
  ${({ margin }) => margin && `margin: ${SPACING_MAP[margin]}rem;`}
  ${({ padding }) => padding && `padding: ${SPACING_MAP[padding]}rem;`}
  
  width: 100%;

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${`${maxWidth}rem`};
    `}

  background-color: transparent;

  /* Breakpoints */

  @media screen and (min-width: ${spacing.breakpoints.sm}px) {
    max-width: ${spacing.pageMaxWidth.sm}rem;
  }

  @media screen and (min-width: ${spacing.breakpoints.md}px) {
    max-width: ${spacing.pageMaxWidth.md}rem;
  }

  @media screen and (min-width: ${spacing.breakpoints.lg}px) {
    max-width: ${spacing.pageMaxWidth.lg}rem;
  }

  @media screen and (min-width: ${spacing.breakpoints.xl}px) {
    max-width: ${spacing.pageMaxWidth.xl}rem;
  }
`;
