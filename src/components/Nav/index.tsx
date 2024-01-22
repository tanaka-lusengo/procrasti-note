'use client';

import Link from 'next/link';

import { usePocket } from '@/context/PocketbaseContext';

import { Button, ButtonLink, Typography } from '../index';

import * as Styled from './index.styled';

const Nav = () => {
  const { user, logout } = usePocket();

  return (
    <header>
      <Styled.Nav>
        <Typography tag="h1" textalign="center">
          <Link href={'/'}>Procrasti-Not(e)</Link>
        </Typography>

        <ul>
          <div>
            <Typography tag="li">
              <Link href={'/'}>Home</Link>
            </Typography>
            {user ? (
              <Typography tag="li">
                <Link href={'/notes'}>Notes</Link>
              </Typography>
            ) : null}
          </div>

          {/* TODO: Add account drop down menu */}
          {user ? (
            <Button onClick={logout}>sign out</Button>
          ) : (
            <ButtonLink href={'/sign-in'}>Sign in</ButtonLink>
          )}
        </ul>
      </Styled.Nav>
    </header>
  );
};

export default Nav;
