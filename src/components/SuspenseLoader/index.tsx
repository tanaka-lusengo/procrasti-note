import { BeatLoader } from 'react-spinners';

import { theme } from '@/styles';

import * as Styled from './index.styled';

const SuspenseLoader = () => (
  <Styled.Container>
    <BeatLoader
      size={15}
      speedMultiplier={1.5}
      color={theme.colors.secondaryDark}
    />
  </Styled.Container>
);

export default SuspenseLoader;
