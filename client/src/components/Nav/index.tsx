import Link from 'next/link';

import { getUserSession } from '@/actions/auth-actions';
import { SignOut } from '@/app/(Auth)/components';

import * as Styled from './index.styled';
import { DropdownItem, NavItemDropdown } from './subComponents';

const Nav = async () => {
  const userSession = await getUserSession();

  return (
    <header>
      <Styled.Nav>
        <Styled.NavItemContainer>
          <NavItemDropdown title="Menu">
            <DropdownItem href={'/'}>Home</DropdownItem>
            {userSession ? (
              <DropdownItem href={'/notes'}>Notes</DropdownItem>
            ) : null}
          </NavItemDropdown>
        </Styled.NavItemContainer>

        <Styled.Logo>
          <Link href={'/'}>Procrasti-Not(e)</Link>
        </Styled.Logo>

        <Styled.NavItemContainer>
          <NavItemDropdown title="Account">
            {!userSession ? (
              <DropdownItem href={'/sign-in'}>Sign In</DropdownItem>
            ) : null}
            {userSession ? <SignOut /> : null}
          </NavItemDropdown>
        </Styled.NavItemContainer>
      </Styled.Nav>
    </header>
  );
};
export default Nav;
