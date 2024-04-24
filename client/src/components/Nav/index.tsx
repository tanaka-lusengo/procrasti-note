import Link from 'next/link';

import { SignOut } from '@/components/Auth';
import { getUserSession } from '@/server/actions/auth-actions';

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
