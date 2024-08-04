'use client';

import { ButtonLink, Typography } from '../Design';

import { NotFoundContainer } from './index.styled';

const NotFoundPage = () => {
  return (
    <NotFoundContainer padding="lg">
      <Typography component="h1" textAlign="center">
        404 | Not Found
      </Typography>
      <Typography textAlign="center">
        Sorry, we couldn&apos;t find what you&apos;re looking for at this time
        🤔
      </Typography>

      <ButtonLink href="/">Return Home</ButtonLink>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
