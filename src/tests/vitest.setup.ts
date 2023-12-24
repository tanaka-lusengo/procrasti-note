import { Slabo_27px, Ultra } from 'next/font/google';
import { vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';

// Mock the next/font/google module
vi.mock('next/font/google', () => ({
  Ultra: () => ({
    style: {
      fontFamily: Ultra,
    },
  }),
  Slabo_27px: () => ({
    style: {
      fontFamily: Slabo_27px,
    },
  }),
}));
