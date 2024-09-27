import Link from 'next/link';

import { SignOut } from '@/components/Actions';
import { getUserSession } from '@/server/actions/helpers';

import { Stack } from '../Design';

import * as Styled from './index.styled';
import { DropdownItem, NavDropdown, ProfilePicture } from './subComponents';

const Nav = async () => {
  const userSession = await getUserSession();

  return (
    <header>
      <Styled.Nav>
        <Styled.DropdownContainer>
          <NavDropdown title="Menu">
            <DropdownItem href={'/'}>Home</DropdownItem>
            {userSession ? (
              <>
                <DropdownItem href={'/profile'}>Profile</DropdownItem>
                <DropdownItem href={'/notes'}>Notes</DropdownItem>
              </>
            ) : null}
          </NavDropdown>
        </Styled.DropdownContainer>

        <Styled.Logo>
          <Link href={userSession ? '/notes' : '/'}>Procrasti-Not(e)</Link>
        </Styled.Logo>

        <div>
          <Stack
            component="div"
            justifyContent="center"
            alignItems="center"
            gap="xs"
          >
            {userSession ? <ProfilePicture /> : null}

            <Styled.DropdownContainer>
              <NavDropdown title="Account">
                {userSession ? (
                  <SignOut />
                ) : (
                  <DropdownItem href={'/sign-in'}>Sign In</DropdownItem>
                )}
              </NavDropdown>
            </Styled.DropdownContainer>
          </Stack>
        </div>
      </Styled.Nav>
    </header>
  );
};
export default Nav;
