'use client';

import Link from 'next/link';

import * as Styled from './index.styled';
import { DropdownItem, NavItemDropdown } from './subComponents';

const Nav = () => {
  return (
    <header>
      <Styled.Nav>
        <Styled.NavItemContainer>
          <NavItemDropdown title="Menu">
            <DropdownItem href={'/'}>Home</DropdownItem>
            <DropdownItem href={'/notes'}>Notes</DropdownItem>
          </NavItemDropdown>
        </Styled.NavItemContainer>

        <Styled.Logo>
          <Link href={'/'}>Procrasti-Not(e)</Link>
        </Styled.Logo>

        <Styled.NavItemContainer>
          <NavItemDropdown title="Account">
            <DropdownItem href={'/sign-in'}>Sign In</DropdownItem>
          </NavItemDropdown>
        </Styled.NavItemContainer>
      </Styled.Nav>
    </header>
  );
};
export default Nav;
