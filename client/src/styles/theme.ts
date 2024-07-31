import { slabo, ultra } from './fonts';

const theme = {
  spacing: {
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
    gap: {
      xs: 0.4,
      sm: 0.8,
      md: 1.6,
      lg: 3.2,
      xl: 6.4,
    },
    pageMaxWidth: {
      sm: 54,
      md: 72,
      lg: 96,
      xl: 115,
    },
  },
  typography: {
    fontFamily: {
      slabo: `${slabo.style.fontFamily}`,
      ultra: `${ultra.style.fontFamily}`,
    },
    fontSize: {
      body1: 1.8,
      body2: 1.6,
      h1: 4,
      h2: 3.6,
      h3: 2.8,
      h4: 2.2,
      h5: 1.8,
      h6: 1.6,
    },
  },
  colors: {
    primary: '#ff6161',
    secondary: '#fcfaf3',
    secondaryDark: '#39a2ae',
    tertiary: '#cbbaed',
    tertiaryDark: '#8f6ed5',
    text: '#231f20',
    white: '#fff',
    black: '#000',
    grey: '#ccc',
    success: '#4caf50',
    error: '#f44336',
  },
};

export default theme;
