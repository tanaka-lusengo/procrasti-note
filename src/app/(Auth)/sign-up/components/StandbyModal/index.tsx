import { ButtonLink, Typography } from '@/components';

import * as Styled from './index.styled';

const StandByModal = () => (
  <Styled.Container>
    <Styled.Content>
      <Typography tag="h3" textalign="center">
        Check your email to verify your account 🥞
      </Typography>

      <ButtonLink href={'/'}>Back to Home</ButtonLink>
    </Styled.Content>
  </Styled.Container>
);

export default StandByModal;
