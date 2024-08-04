import Link from 'next/link';

import { Typography } from '../Design';

import { FooterContainer } from './index.styled';

const Footer = () => {
  const LINKED_IN_URL = 'https://www.linkedin.com/in/tanakalusengo/';
  const ICONS_8_URL = 'https://icons8.com';

  return (
    <FooterContainer>
      <Typography>
        Designed & Built by:{' '}
        <Link href={LINKED_IN_URL} target="_blank">
          Tanaka Lusengo
        </Link>
      </Typography>

      <Typography>
        Icons by:{' '}
        <Link href={ICONS_8_URL} target="_blank">
          Icons8
        </Link>
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
