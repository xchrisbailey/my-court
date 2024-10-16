import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts',
    coverage: { provider: 'v8', reporter: ['html', 'lcov'], enabled: true },
    exclude: ['**/node_modules/**', '**/dist/**', '**/src/components/ui/**'],
  },
});
