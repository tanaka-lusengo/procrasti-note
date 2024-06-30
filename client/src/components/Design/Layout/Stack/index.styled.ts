'use client';

import { createElement } from 'react';
import styled, { css } from 'styled-components';

import { SPACING_MAP } from '@/components/Design/constants';

import { StackProps } from './index';

export const DynamicStack = styled(
  ({
    component = 'div',
    // -- parameters below are not used in this context to avoid passing it to the DOM
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    justifyContent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    alignItems,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    marginTop,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    marginBottom,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    maxWidth,
    children,
    ...props
  }: StackProps) => createElement(component, props, children),
)`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap = 'sm' }) => `${SPACING_MAP[gap]}rem`};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};

  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}rem`};

  /* Margin */

  margin: ${({ margin }) => (margin ? `${SPACING_MAP[margin]}rem` : `0 auto`)};

  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${`${SPACING_MAP[marginTop]}rem`};
    `}

  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${`${SPACING_MAP[marginBottom]}rem`};
    `}
`;
