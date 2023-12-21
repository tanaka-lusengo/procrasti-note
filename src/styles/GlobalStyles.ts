"use client";
import { createGlobalStyle } from "styled-components";
import { theme } from "./index";

const GlobalStyles = createGlobalStyle`

html,
body {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: ${theme.colors.text};
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
  /* 16px */
  font-size: 1.6rem;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
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
  font-size: 1.8rem;
  line-height: 1.52;
}

h1 {
  font-size: 4rem;
  line-height: 1.375;
}

h2 {
  font-size: 3.6rem;
  line-height: 1.38;
}

h3 {
  font-size: 2.8rem;
  line-height: 1.428;
}

h4 {
  font-size: 2.2rem;
  line-height: 1.5;
}

h5 {
  font-size: 1.8rem;
  line-height: 1.3;
}

h6 {
  font-size: 1.6rem;
  line-height: 1.5;
}

`;

export default GlobalStyles;
