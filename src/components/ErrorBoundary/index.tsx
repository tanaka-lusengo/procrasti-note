'use client';

import { useEffect } from 'react';

import { Button, Typography } from '../Design';

import { ErrorBoundaryContainer } from './index.styled';

export interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  message?: string;
}

const ErrorBoundary = ({ error, reset, message }: ErrorBoundaryProps) => {
  useEffect(() => {
    console.error('Error in ErrorBoundary:', error);
  }, [error]);

  return (
    <ErrorBoundaryContainer padding="lg">
      <Typography component="h2" textAlign="center">
        {message ? message : 'Oops, something went wrong! 😿'}
      </Typography>
      <Typography component="h4" textAlign="center">
        &quot;{error.message}&quot;
      </Typography>

      <Button onClick={() => reset()}>Try again!</Button>
    </ErrorBoundaryContainer>
  );
};

export default ErrorBoundary;
