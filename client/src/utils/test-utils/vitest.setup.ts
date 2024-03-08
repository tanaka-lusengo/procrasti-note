import { Slabo_27px, Ultra } from 'next/font/google';
import { beforeAll, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';

// Mock the 'next/navigation' module with a mock implementation in the tests.
beforeAll(() => {
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: vi.fn(),
    };
  });
});

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

// sets globalThis.fetch and globalThis.fetchMock to our mocked version of fetch
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();
