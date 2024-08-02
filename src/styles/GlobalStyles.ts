'use client';

import { createGlobalStyle } from 'styled-components';

import theme from './theme';

const { spacing, colors, typography } = theme;

const GlobalStyles = createGlobalStyle`

html,
body {
  padding: 0;
  margin: 0;
  font-family: ${typography.fontFamily.slabo};
  color: ${colors.text};
  background-color: ${colors.secondary};
}

html {
  /* 10px */
  font-size: 62.5%;
}

/*
  - Set base font-size to accissible 16px
  - Add base accessible line-height
  - Improve text rendering
*/
body {
  /* 18px */
  font-size: 1.8rem;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

li {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Use a more-intuitive box-sizing model. */
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* Improve media defaults */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* Remove built-in form typography styles */
input,
button,
textarea,
select {
  font: inherit;
}

/* Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* Add accessible font styles */
p {
  line-height: 1.52;
}

h1 {
  font-size: 3.6rem;
  line-height: 1.375;

   @media (min-width: ${spacing.breakpoints}px) {
    font-size: 4rem;
  }
}

h2 {
  font-size: 2.8rem;
  line-height: 1.38;

   @media (min-width: ${spacing.breakpoints}px) {
    font-size: 3.6rem;
  }
}

h3 {
  font-size: 2.2rem;
  line-height: 1.428;

   @media (min-width: ${spacing.breakpoints}px) {
    font-size: 2.8rem;
  }
}

h4 {
  font-size: 1.8rem;
  line-height: 1.5;

   @media (min-width: ${spacing.breakpoints}px) {
    font-size: 2.2rem;
  }
}

h5 {
  font-size: 1.6rem;
  line-height: 1.3;

   @media (min-width: ${spacing.breakpoints}px) {
    font-size: 1.8rem;
  }
}

h6 {
  font-size: 1.6rem;
  line-height: 1.5;
}

`;

export default GlobalStyles;
