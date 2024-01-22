'use client';

import { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

import { Button, Typography } from '@/components';
import { usePocket } from '@/context/PocketbaseContext';

import * as Styled from './page.styled';

const ConfirmEmailVerification = () => {
  const token = useSearchParams().get('token');
  const { handleEmailVerification } = usePocket();

  return (
    <Styled.MainContainer>
      <Styled.Content>
        <Styled.Container>
          <Typography tag="h3" textalign="center">
            Confirm email!
          </Typography>

          <Styled.ButtonContainer>
            <Button
              $basefont
              onClick={() => handleEmailVerification(token as string)}
            >
              Verify
            </Button>
          </Styled.ButtonContainer>

          <Toaster />
        </Styled.Container>
      </Styled.Content>
    </Styled.MainContainer>
  );
};

export default ConfirmEmailVerification;
