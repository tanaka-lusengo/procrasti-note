'use client';

import { ErrorBoundary } from '@/components';
import { type ErrorBoundaryProps } from '@/components/ErrorBoundary';

const Error = ({ error, reset }: ErrorBoundaryProps) => (
  <ErrorBoundary
    error={error}
    reset={reset}
    message={'Oops, an error occurred while signing in! 😿'}
  />
);

export default Error;
