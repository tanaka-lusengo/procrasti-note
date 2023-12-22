import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/vitest.setup.ts'],
    server: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
    },
    coverage: {
      provider: 'v8',
    },
  },
});
