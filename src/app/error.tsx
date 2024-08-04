'use client';

import { ErrorBoundary } from '@/components';
import { type ErrorBoundaryProps } from '@/components/ErrorBoundary';

const Error = ({ error, reset }: ErrorBoundaryProps) => (
  <ErrorBoundary error={error} reset={reset} />
);

export default Error;
