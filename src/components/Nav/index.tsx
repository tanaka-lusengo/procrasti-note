'use client';
import Link from 'next/link';
import * as Styled from './index.styled';
import { Typography } from '../index';

const Nav = () => (
  <header>
    <Styled.Nav>
      <Typography tag="h1">
        <Link href={'/'}>Procrasti-Not(e)</Link>
      </Typography>

      <ul>
        <Typography tag="li">
          <Link href={'/'}>Home</Link>
        </Typography>
        <Typography tag="li">
          <Link href={'/notes'}>Notes</Link>
        </Typography>
      </ul>
    </Styled.Nav>
  </header>
);

export default Nav;
