import React from 'react';
import { describe, expect, it } from 'vitest';

import { convertStringToHTML } from './index';

// Helper function
const validateReactElement = (htmlString: string) => {
  const reactElement = convertStringToHTML(htmlString) as React.ReactElement;
  expect(React.isValidElement(reactElement)).toBeTruthy();
  return reactElement.props.children;
};

describe('convertStringToHTML', () => {
  it('should convert a simple HTML string to a React element', () => {
    const validElement = validateReactElement('<div>Hello World</div>');

    expect(validElement).toEqual('Hello World');
  });

  it('should convert a complex HTML string to a React element', () => {
    // Note: the whitespace between the span and strong tags is intentional to test that the whitespace is preserved
    const validElement = validateReactElement(
      '<div><span>Hello</span> <strong>World</strong></div>',
    );

    expect(validElement.length).toEqual(3);
    expect(validElement[0].props.children).toEqual('Hello');
    expect(validElement[1]).toEqual(' ');
    expect(validElement[2].props.children).toEqual('World');
  });
});
