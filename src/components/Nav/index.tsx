import Link from 'next/link';

import { SignOut } from '@/components/Auth';
import { getUserSession } from '@/server/actions/auth-actions';

import * as Styled from './index.styled';
import { DropdownItem, NavDropdown } from './subComponents';

const Nav = async () => {
  const userSession = await getUserSession();

  return (
    <header>
      <Styled.Nav>
        <Styled.DropdownContainer>
          <NavDropdown title="Menu">
            <DropdownItem href={'/'}>Home</DropdownItem>
            {userSession ? (
              <DropdownItem href={'/notes'}>Notes</DropdownItem>
            ) : null}
          </NavDropdown>
        </Styled.DropdownContainer>

        <Styled.Logo>
          <Link href={'/'}>Procrasti-Not(e)</Link>
        </Styled.Logo>

        <Styled.DropdownContainer>
          <NavDropdown title="Account">
            {!userSession ? (
              <DropdownItem href={'/sign-in'}>Sign In</DropdownItem>
            ) : null}
            {userSession ? <SignOut /> : null}
          </NavDropdown>
        </Styled.DropdownContainer>
      </Styled.Nav>
    </header>
  );
};
export default Nav;
