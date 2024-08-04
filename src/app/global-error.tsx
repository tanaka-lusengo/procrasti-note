'use client';

import { ErrorBoundary } from '@/components';
import { type ErrorBoundaryProps } from '@/components/ErrorBoundary';

const GlobalError = ({ error, reset }: ErrorBoundaryProps) => (
  <html>
    <body>
      <ErrorBoundary error={error} reset={reset} />
    </body>
  </html>
);

export default GlobalError;
