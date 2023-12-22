import styled from 'styled-components';
import { createElement } from 'react';
import { TypographyProps } from './index';

// A styled component for creating dynamic typography elements based on the props passed to it.
export const DynamicTypography = styled(
  ({ tag, children, ...props }: TypographyProps) =>
    createElement(tag, props, children),
)`
  text-align: ${({ textalign }) => textalign};
`;
